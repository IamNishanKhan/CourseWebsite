import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, BookOpen, Calendar, GraduationCap, ChevronRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CourseCard } from '../components/CourseCard';

interface DashboardResponse {
  welcome_message: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: string;
    profile_picture: string | null;
    bio: string | null;
  };
  enrollments: {
    enrollment_id: number;
    course: {
      course_id: number;
      course_title: string;
      instructor_id: number;
      instructor_name: string;
      description: string;
      price: string;
      thumbnail: string | null;
      created_at: string;
      updated_at: string;
      category_id: number;
      category_name: string;
    };
    enrolled_at: string;
  }[];
}

export const Dashboard = () => {
  const { isAuthenticated, accessToken } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get<DashboardResponse>("http://127.0.0.1:8000/api/accounts/dashboard/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setDashboardData(data);
      } catch (err) {
        setError("Failed to load dashboard information");
        console.error("Dashboard error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && accessToken) {
      fetchDashboardData();
    }
  }, [isAuthenticated, accessToken]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-gray-200 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-black opacity-10" />
          <div className="relative px-8 py-12">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Picture */}
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div className="w-32 h-32 rounded-2xl border-4 border-white/80 bg-gradient-to-br from-white to-indigo-100 p-1 shadow-xl">
                  <div className="w-full h-full rounded-xl bg-white flex items-center justify-center overflow-hidden">
                    <img src={dashboardData.user.profile_picture || "https://cdn-icons-png.flaticon.com/512/354/354637.png"} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>

              {/* User Info */}
              <div className="text-center md:text-left flex-grow">
                <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold text-white mb-2">
                  {dashboardData.welcome_message}
                </motion.h1>
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6">
                  <div className="flex items-center space-x-2 text-indigo-100">
                    <Mail className="w-4 h-4" />
                    <span>{dashboardData.user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-indigo-100">
                    <GraduationCap className="w-4 h-4" />
                    <span>{dashboardData.user.role.charAt(0).toUpperCase() + dashboardData.user.role.slice(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enrolled Courses */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">My Learning Journey</h2>
            <Link to="/courses" className="text-indigo-600 hover:text-indigo-700 flex items-center space-x-1">
              <span>Browse more courses</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <AnimatePresence>
            {dashboardData.enrollments.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12 bg-white rounded-xl shadow-sm">
                <GraduationCap className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
                <p className="text-gray-600 mb-6">Start your learning journey today!</p>
                <Link to="/courses" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Courses
                </Link>
              </motion.div>
            ) : (
              // Replace the enrolled courses grid section with this:
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardData.enrollments.map((enrollment, index) => {
                  // Transform enrollment data to match CourseCard props
                  const courseData = {
                    course_id: enrollment.course.course_id,
                    category: enrollment.course.category_id,
                    category_name: enrollment.course.category_name,
                    instructor_name: enrollment.course.instructor_name,
                    course_title: enrollment.course.course_title,
                    description: enrollment.course.description,
                    price: '', // Empty price as we don't want to show it
                    thumbnail: enrollment.course.thumbnail,
                    created_at: enrollment.enrolled_at,
                    isEnrolled: true, // Add this flag to indicate it's an enrolled course
                  };

                  return (
                    <motion.div
                      key={enrollment.enrollment_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CourseCard 
                        course={courseData} 
                        onContinue={() => navigate(`/course/${enrollment.course.course_id}/progress`)}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
