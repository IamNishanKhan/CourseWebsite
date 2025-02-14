import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "../components/form/Input";
import axios from "axios";
import { toast } from 'sonner';

export const ChangePassword = () => {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState({
    password: false,
  });

  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("New passwords do not match!");
      return;
    }

    setIsLoading((prev) => ({ ...prev, password: true }));

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

      setPasswordData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
      toast.success("Password changed successfully!");
    } catch (err: any) {
      toast.error("Failed to change password!");
    } finally {
      setIsLoading((prev) => ({ ...prev, password: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
          <form onSubmit={handleChangePassword} className="space-y-6 pt-6">
            

            <div className="space-y-4">
              <Input id="old_password" type="password" label="Current Password" value={passwordData.old_password} onChange={(value) => handlePasswordChange("old_password", value)} icon={<Lock className="h-5 w-5 text-gray-400" />} required />
              <Input id="new_password" type="password" label="New Password" value={passwordData.new_password} onChange={(value) => handlePasswordChange("new_password", value)} icon={<Lock className="h-5 w-5 text-gray-400" />} required />
              <Input id="confirm_password" type="password" label="Confirm New Password" value={passwordData.confirm_password} onChange={(value) => handlePasswordChange("confirm_password", value)} icon={<Lock className="h-5 w-5 text-gray-400" />} required />
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading.password} className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {isLoading.password ? "Changing..." : "Change Password"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
