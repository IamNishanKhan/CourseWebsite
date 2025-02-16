import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Input } from "./form/Input";

interface ResetPasswordProps {
  email: string;
  otpCode: string;
  onPasswordReset: (newPassword: string) => void;
  onBack: () => void;
}

export const SetNewPassword: React.FC<ResetPasswordProps> = ({
  email,
  otpCode,
  onPasswordReset,
  onBack,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      await onPasswordReset(newPassword);
    } catch (error) {
      setError("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your new password for <span className="font-medium">{email}</span>
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="new-password"
          type="password"
          label="New Password"
          value={newPassword}
          onChange={setNewPassword}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          placeholder="Enter new password"
          required
        />

        <Input
          id="confirm-password"
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          placeholder="Confirm new password"
          required
        />

        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            type="button"
          >
            Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};