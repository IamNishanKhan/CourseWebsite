import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "../components/form/Input";
import { toast } from "sonner";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Placeholder for future backend implementation
    try {
      toast.info("This feature will be implemented soon!");
      // Here you'll implement the password reset logic
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center space-x-2">
              <GraduationCap className="h-12 w-12 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">BM Academy</span>
            </motion.div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">Enter your email address and we'll send you instructions to reset your password.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input id="email" type="email" label="Email address" value={email} onChange={setEmail} icon={<Mail className="h-5 w-5 text-gray-400" />} placeholder="you@example.com" required />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md
                     shadow-sm text-sm font-medium text-white bg-indigo-600 
                     ${isLoading ? "opacity-75 cursor-not-allowed" : "hover:bg-indigo-700"}
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading ? "Sending..." : "Send Reset Instructions"}
          </motion.button>

          <div className="text-center">
            <Link to="/login" className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
