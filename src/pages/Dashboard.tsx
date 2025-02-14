import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  ChevronRight,
  Target,
  BookOpen,
  Users,
  Mail,
  Award,
  Zap,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext"; // Updated import
import { Navigate, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EnrolledCourseCard } from "../components/EnrolledCourseCard";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  profile_picture: string | null;
}

interface Course {
  course_id: number;
  title: string;
  thumbnail: string | null;
  instructor_name: string;
}

interface Enrollment {
  enrollment_id: number;
  course: Course;
  enrolled_at: string;
}

export const Dashboard = () => {
  const { isAuthenticated, accessToken } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/accounts/dashboard/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setUser(response.data.user);
        setEnrollments(response.data.enrollments);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, accessToken]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleCourseClick = (courseId: number) => {
    navigate(`/course/${courseId}/progress`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90" />
            <div className="relative px-8 py-12">
              <div className="flex flex-col md:flex-row items-center md:items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Profile Avatar */}
                <motion.div whileHover={{ scale: 1.05 }} className="relative">
                  <div className="w-32 h-32 rounded-2xl border-4 border-white bg-gradient-to-br from-white to-indigo-100 p-1 shadow-xl">
                    <div className="w-full h-full rounded-xl bg-white flex items-center justify-center overflow-hidden">
                      {user.profile_picture ? (
                        <img
                          src={user.profile_picture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/354/354637.png"
                          alt="Default Profile"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* User Info */}
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-white">
                    {user.first_name} {user.last_name}
                  </h1>
                  <p className="text-indigo-100 mb-2">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </p>
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-indigo-100">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex-grow flex justify-end space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-sm text-indigo-100">Courses</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">85%</div>
                    <div className="text-sm text-indigo-100">Progress</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enrolled Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                My Learning Journey
              </h2>
              <p className="text-gray-600 mt-1">Continue where you left off</p>
            </div>
            <Link
              to="/courses"
              className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium bg-indigo-50 px-4 py-2 rounded-lg transition-colors"
            >
              Explore More Courses
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <GraduationCap className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              </motion.div>
              <p className="text-gray-600">Loading your learning journey...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-2xl">
              <div className="max-w-md mx-auto">
                <p className="text-red-600 mb-2">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-red-600 underline hover:text-red-700"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : enrollments.length === 0 ? (
            <div className="text-center py-12 bg-indigo-50 rounded-2xl">
              <BookOpen className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Start Your Learning Journey
              </h3>
              <p className="text-gray-600 mb-6">
                Explore our courses and begin your educational adventure
              </p>
              <Link
                to="/courses"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Browse Courses
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrollments.map((enrollment) => (
                <EnrolledCourseCard
                  key={enrollment.enrollment_id}
                  enrollment={enrollment}
                  onCourseClick={handleCourseClick}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
