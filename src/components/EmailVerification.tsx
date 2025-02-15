import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

interface EmailVerificationProps {
  email: string;
  onVerificationComplete: (otpCode: string) => void;
  onBack: () => void;
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({ email, onVerificationComplete, onBack }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (verificationCode.length !== 6) {
      setError("Invalid verification code");
      setIsLoading(false);
      return;
    }

    onVerificationComplete(verificationCode);
    setIsLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Enter OTP</h2>
        <p className="mt-2 text-sm text-gray-600">We've sent a verification code to <span className="font-medium">{email}</span></p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" maxLength={6} value={verificationCode} onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))} className="w-full px-3 py-2 border rounded-md" placeholder="Enter OTP" required />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md">{isLoading ? "Verifying..." : "Verify OTP"}</button>
      </form>
    </motion.div>
  );
};
