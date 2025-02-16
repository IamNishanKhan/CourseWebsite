import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Mail, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/form/Input";
import { EmailVerification } from "../components/EmailVerification";
import { SetNewPassword } from "../components/SetNewPassword";
import { toast } from "sonner";
import axios from "axios";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [otpCode, setOtpCode] = useState("");
  const [token, setToken] = useState(""); // Token from backend
  const navigate = useNavigate();

  // **Step 1: Send OTP**
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/api/accounts/password-reset/request-otp/", { email });
      toast.success("OTP sent to your email");
      setStep("otp"); // Move to OTP verification step
    } catch (error) {
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // **Step 2: Verify OTP**
  const handleVerifyOTP = async (code: string) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/accounts/password-reset/verify-otp/", {
        email,
        otp_code: code,
      });

      setOtpCode(code);
      setToken(response.data.token); // Store token received
      setStep("reset"); // Move to reset password step
      toast.success("OTP verified successfully");
    } catch (error) {
      toast.error("Invalid OTP");
    }
  };

  // **Step 3: Set New Password**
  const handleResetPassword = async (newPassword: string) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/accounts/password-reset/set-password/", {
        email,
        token,
        new_password: newPassword,
      });

      toast.success("Password reset successfully");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        <div className="text-center">
          <Link to="/" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center space-x-2"
            >
              <GraduationCap className="h-12 w-12 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">BM Academy</span>
            </motion.div>
          </Link>
        </div>

        {/* **Step 1: Request OTP** */}
        {step === "email" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email address, and we'll send you a verification code
              </p>
            </div>

            <form onSubmit={handleSendOTP} className="space-y-4">
              <Input
                id="email"
                type="email"
                label="Email address"
                value={email}
                onChange={setEmail}
                icon={<Mail className="h-5 w-5 text-gray-400" />}
                placeholder="you@example.com"
                required
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                {isLoading ? "Sending..." : "Send Reset Code"}
              </motion.button>
            </form>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </motion.div>
        )}

        {/* **Step 2: Verify OTP** */}
        {step === "otp" && (
          <EmailVerification
            email={email}
            onVerificationComplete={handleVerifyOTP}
            onBack={() => setStep("email")}
          />
        )}

        {/* **Step 3: Set New Password** */}
        {step === "reset" && (
          <SetNewPassword
            email={email}
            otpCode={otpCode}
            onPasswordReset={handleResetPassword}
            onBack={() => setStep("otp")}
          />
        )}
      </motion.div>
    </div>
  );
};
