import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, LogOut, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // Updated import

interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string | null;
}

export const Navbar = () => {
  const { isAuthenticated, logout, accessToken, refreshToken } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);

  // ✅ Fetch user profile when authenticated
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      axios
        .get("http://127.0.0.1:8000/api/accounts/profile/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("❌ Error fetching profile:", error);
        });
    }
  }, [isAuthenticated, accessToken]);

  // ✅ Proper Logout API Call (Sends Refresh Token in Body)
  const handleLogout = async () => {
    try {
      if (!refreshToken) {
        console.error("❌ No refresh token found");
        return;
      }

      await axios.post(
        "http://127.0.0.1:8000/api/accounts/logout/",
        { refresh: refreshToken },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      logout();
      setIsProfileOpen(false);
    } catch (error) {
      console.error("❌ Logout Failed:", error);
    }
  };

  return (
    <motion.nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">EduPro</span>
            </motion.div>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Courses
            </Link>

            {isAuthenticated && userData ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors">
                  Dashboard
                </Link>
                <div className="relative">
                  <motion.button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="relative p-2 rounded-full bg-white shadow-sm"
                  >
                    {/* ✅ Show Profile Picture or Default Avatar */}
                    {userData.profile_picture ? (
                      <img
                        src={userData.profile_picture}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/354/354637.png"
                        alt="Default Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div className="absolute right-0 mt-3 w-72 origin-top-right bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5">
                        <div className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {userData.profile_picture ? (
                                <img
                                  src={userData.profile_picture}
                                  alt="Profile"
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              ) : (
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/354/354637.png"
                                  alt="Default Profile"
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {userData.first_name} {userData.last_name}
                              </p>
                              <p className="text-xs text-gray-500">{userData.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          <Link
                            to="/dashboard"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-indigo-50"
                          >
                            <BookOpen className="w-4 h-4 mr-3 text-indigo-500" />
                            Dashboard
                          </Link>
                        </div>

                        {/* ✅ LOGOUT BUTTON */}
                        <div className="p-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Log out
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <Link to="/login" className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
