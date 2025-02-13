import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, LogOut, User, Settings, BookOpen, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="relative group">
      <span className={`${isActive ? "text-indigo-600" : "text-gray-700"} transition-colors group-hover:text-indigo-600`}>{children}</span>
      <motion.div className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: isActive ? 1 : 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.2 }} />
    </Link>
  );
};

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="fixed w-full bg-white/80 backdrop-blur-md  z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">EduPro</span>
            </motion.div>
          </Link>

          <div className="flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/courses">Courses</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <div className="relative">
                  <motion.button ref={buttonRef} whileHover={{ scale: 1.05 }} onClick={() => setIsProfileOpen(!isProfileOpen)} className="relative p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg transition-all duration-300">
                    <User className="w-5 h-5" />
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-400 ring-2 ring-white" />
                  </motion.button>

                  <AnimatePresence >
                    {isProfileOpen && (
                      <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.95,
                          y: 10,
                          transition: {
                            duration: 0.2,
                          },
                        }}
                        className="absolute right-0 mt-5 border border-1 border-black/20 w-72 origin-top-right rounded-xl shadow-lg  bg-white divide-y divide-gray-100"
                      >
                        <div className="p-4  rounded-t-xl bg-white/40">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">{user?.name.charAt(0)}</div>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                              <p className="text-xs text-gray-700">{user?.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2 ">
                          <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-white/50 transition-colors">
                            <BookOpen className="w-4 h-4 mr-3 text-indigo-500" />
                            Dashboard
                          </Link>
                        </div>

                        <div className="p-2  rounded-b-xl">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                              logout();
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-white/50 transition-colors"
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
              <>
                <Link to="/login" className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 rounded-md text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
