import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext"; // Updated import
import { Navigate, Link, useNavigate } from "react-router-dom";
import { Input } from "../components/form/Input";
import { toast } from 'sonner';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(""); // Add this line
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success("Logged in successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Invalid email or password");
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
              <span className="text-2xl font-bold text-gray-900">EduPro</span>
            </motion.div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
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
            <Input 
              id="email" 
              type="email" 
              label="Email address" 
              value={email} 
              onChange={setEmail} 
              icon={<Mail className="h-5 w-5 text-gray-400" />} 
              placeholder="you@example.com" 
              required 
              error={emailError} 
            />

            <Input id="password" type="password" label="Password" value={password} onChange={setPassword} icon={<Lock className="h-5 w-5 text-gray-400" />} placeholder="••••••••" required />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
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
            {isLoading ? "Signing in..." : "Sign in"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
