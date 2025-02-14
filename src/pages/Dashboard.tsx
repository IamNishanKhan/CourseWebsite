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
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { EnrolledCourseCard } from "../components/EnrolledCourseCard";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  bio: string;
  phone: string;
  role: string;
  profile_picture: string | null;
}

interface Course {
  course_id: number;
  instructor_id: number;
  instructor_name: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  category: number;
}

interface Enrollment {
  enrollment_id: number;
  course: Course;
  enrolled_at: string;
}

export const Dashboard = () => {
  const { isAuthenticated, accessToken, user } = useAuth(); // Add user here
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/enrollments/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setEnrollments(response.data);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
        setError("Failed to load enrolled courses.");
      }
    };

    if (isAuthenticated) {
      fetchEnrollments();
    }
  }, [isAuthenticated, accessToken]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
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
          </div>

          {error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : enrollments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
              <Link
                to="/courses"
                className="mt-4 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <EnrolledCourseCard
                  key={enrollment.enrollment_id}
                  enrollment={enrollment}
                  onCourseClick={(courseId) => navigate(`/course/${courseId}/progress`)}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
