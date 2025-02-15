import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, User, Mail, Lock, Phone } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Input } from "../components/form/Input";
import { EmailVerification } from "../components/EmailVerification";
import { toast } from "sonner";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false); // Controls email verification screen
  const { signup, isAuthenticated } = useAuth();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // If everything is fine, move to email verification
    setShowVerification(true);
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setError("");

    try {
      await signup(firstName, lastName, email, phone, password);
      toast.success("Account created successfully!");
    } catch (err: any) {
      console.error("Signup failed:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.detail || "Registration failed");
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        <div className="text-center">
          <Link to="/" className="inline-block">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center space-x-2">
              <GraduationCap className="h-12 w-12 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">BM Academy</span>
            </motion.div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Show Email Verification only after form submission */}
        {showVerification ? (
          <EmailVerification
            email={email}
            onVerificationComplete={handleSignup}
            onBack={() => setShowVerification(false)}
          />
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div className="space-y-4">
              <Input
                id="first_name"
                type="text"
                label="First Name"
                value={firstName}
                onChange={setFirstName}
                icon={<User className="h-5 w-5 text-gray-400" />}
                placeholder="First Name"
                required
              />

              <Input
                id="last_name"
                type="text"
                label="Last Name"
                value={lastName}
                onChange={setLastName}
                icon={<User className="h-5 w-5 text-gray-400" />}
                placeholder="Last Name"
                required
              />

              <Input
                id="email"
                type="email"
                label="Email address"
                value={email}
                onChange={setEmail}
                icon={<Mail className="h-5 w-5 text-gray-400" />}
                placeholder="you@email.com"
                required
              />

              <Input
                id="phone"
                type="tel"
                label="Phone Number"
                value={phone}
                onChange={setPhone}
                icon={<Phone className="h-5 w-5 text-gray-400" />}
                placeholder="+880XXXXXXXXXX"
                required
              />

              <Input
                id="password"
                type="password"
                label="Password"
                value={password}
                onChange={setPassword}
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                placeholder="••••••••"
                required
              />

              <Input
                id="confirm_password"
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                placeholder="••••••••"
                required
              />
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
              {isLoading ? "Processing..." : "Create Account"}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
