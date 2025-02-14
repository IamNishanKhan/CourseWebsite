import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, Upload } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/form/Input";
import axios from "axios";
import { toast } from 'sonner';

export const Settings = () => {
  const { user, accessToken, setUser } = useAuth(); // Add setUser
  const [isLoading, setIsLoading] = useState({
    profile: false,
    password: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
  });

  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
    setSuccess("");
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    setError("");
    setSuccess("");
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      setError("New passwords do not match");
      return;
    }

    setIsLoading((prev) => ({ ...prev, password: true }));
    setError("");
    setSuccess("");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/accounts/change-password/",
        {
          old_password: passwordData.old_password,
          new_password: passwordData.new_password,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setSuccess("Password changed successfully!");
      setPasswordData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to change password");
    } finally {
      setIsLoading((prev) => ({ ...prev, password: false }));
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(prev => ({ ...prev, profile: true }));

    try {
      const formPayload = new FormData();
      
      if (formData.first_name) formPayload.append("first_name", formData.first_name);
      if (formData.last_name) formPayload.append("last_name", formData.last_name);
      if (profilePicture) formPayload.append("profile_picture", profilePicture);

      const response = await axios.put(
        "http://127.0.0.1:8000/api/accounts/update/",
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        toast.success("Profile updated successfully!");
        setUser({
          ...user!,
          ...response.data,
        });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to update profile");
    } finally {
      setIsLoading(prev => ({ ...prev, profile: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">{error}</div>}

          {success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md">{success}</div>}

          <div className="space-y-8">
            {/* Profile Information */}
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input id="first_name" type="text" label="First Name" value={formData.first_name} onChange={(value) => handleInputChange("first_name", value)} icon={<User className="h-5 w-5 text-gray-400" />} required />

                <Input id="last_name" type="text" label="Last Name" value={formData.last_name} onChange={(value) => handleInputChange("last_name", value)} icon={<User className="h-5 w-5 text-gray-400" />} required />
              </div>

              {/* Profile Picture section remains the same */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                    <img src={user?.profile_picture || "https://cdn-icons-png.flaticon.com/512/354/354637.png"} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Upload className="w-4 h-4 inline-block mr-2" />
                    Upload New Picture
                    <input type="file" className="hidden" accept="image/*" onChange={handleProfilePictureChange} />
                  </label>
                </div>
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading.profile} className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {isLoading.profile ? "Updating..." : "Update Profile"}
              </motion.button>
            </form>

            {/* Change Password */}
            <form onSubmit={handleChangePassword} className="space-y-6 pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>

              <div className="space-y-4">
                <Input id="old_password" type="password" label="Current Password" value={passwordData.old_password} onChange={(value) => handlePasswordChange("old_password", value)} icon={<Lock className="h-5 w-5 text-gray-400" />} required />

                <Input id="new_password" type="password" label="New Password" value={passwordData.new_password} onChange={(value) => handlePasswordChange("new_password", value)} icon={<Lock className="h-5 w-5 text-gray-400" />} required />

                <Input id="confirm_password" type="password" label="Confirm New Password" value={passwordData.confirm_password} onChange={(value) => handlePasswordChange("confirm_password", value)} icon={<Lock className="h-5 w-5 text-gray-400" />} required />
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading.password} className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {isLoading.password ? "Changing..." : "Change Password"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
