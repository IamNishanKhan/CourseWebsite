import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Upload } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/form/Input";
import axios from "axios";

export const UpdateProfile = () => {
  const { user, accessToken, setUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState({ profile: false });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    bio: user?.bio || "",
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
    setSuccess("");
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading({ profile: true });
    setError("");
    setSuccess("");

    try {
      const formPayload = new FormData();

      if (formData.first_name) formPayload.append("first_name", formData.first_name);
      if (formData.last_name) formPayload.append("last_name", formData.last_name);
      if (formData.bio) formPayload.append("bio", formData.bio);
      if (profilePicture) formPayload.append("profile_picture", profilePicture);

      const response = await axios.put("http://127.0.0.1:8000/api/accounts/update/", formPayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        setSuccess("Profile updated successfully!");
        setUser({
          ...user!,
          ...response.data,
        });
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update profile");
    } finally {
      setIsLoading({ profile: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Profile</h2>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md">{success}</div>}

          <form onSubmit={handleUpdateProfile} className="space-y-6">
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

            <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input id="first_name" type="text" label="First Name" value={formData.first_name} onChange={(value) => handleInputChange("first_name", value)} icon={<User className="h-5 w-5 text-gray-400" />} required />
              <Input id="last_name" type="text" label="Last Name" value={formData.last_name} onChange={(value) => handleInputChange("last_name", value)} icon={<User className="h-5 w-5 text-gray-400" />} required />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Update Bio</h3>
              <textarea id="bio" className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" rows={5} value={formData.bio} onChange={(e) => handleInputChange("bio", e.target.value)} required />
            </div>

            

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading.profile} className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {isLoading.profile ? "Updating..." : "Update Profile"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
