import React, { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, User, Mail, Lock, Phone } from "lucide-react";
import { useAuth } from "../contexts/AuthContext"; // Updated import
import { Navigate, Link } from "react-router-dom";
import { Input } from "../components/form/Input";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signup(name, email, password, phone);
    } catch (err: any) {
      console.error("Signup failed:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.detail || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center space-x-2">
              <GraduationCap className="h-12 w-12 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">EduPro</span>
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
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center">
            {error}
          </motion.div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input id="name" type="text" label="Full Name" value={name} onChange={setName} icon={<User className="h-5 w-5 text-gray-400" />} placeholder="John Doe" required />

            <Input id="email" type="email" label="Email address" value={email} onChange={setEmail} icon={<Mail className="h-5 w-5 text-gray-400" />} placeholder="you@example.com" required />

            <Input id="phone" type="tel" label="Phone Number" value={phone} onChange={setPhone} icon={<Phone className="h-5 w-5 text-gray-400" />} placeholder="01XXXXXXXXX" required />

            <Input id="password" type="password" label="Password" value={password} onChange={setPassword} icon={<Lock className="h-5 w-5 text-gray-400" />} placeholder="••••••••" required />
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
            {isLoading ? "Creating account..." : "Create Account"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
