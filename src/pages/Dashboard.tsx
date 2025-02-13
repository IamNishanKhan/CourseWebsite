import { motion } from "framer-motion";
import { User, BookOpen, Star, TrendingUp, Calendar, Bell, Award, Clock, Zap, ChevronRight, Target, Bookmark, Trophy, BarChart, Book, Users, Mail } from "lucide-react";
import { useAuth } from "../lib/auth";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { StatCard } from "../components/StatCard";
import { EnrolledCourseCard } from "../components/EnrolledCourseCard";

// Mock data for enrolled courses with detailed progress
const enrolledCourses = [
  {
    id: "web-development",
    title: "Web Development Masterclass",
    progress: 65,
    lastAccessed: "2024-03-14",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    nextLesson: "Advanced React Patterns",
    totalLessons: 24,
    completedLessons: 16,
    instructor: "John Smith",
    lastActivity: "Completed Module 3: React Hooks",
  },
  {
    id: "web-development",
    title: "Web Development Masterclass",
    progress: 65,
    lastAccessed: "2024-03-14",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    nextLesson: "Advanced React Patterns",
    totalLessons: 24,
    completedLessons: 16,
    instructor: "John Smith",
    lastActivity: "Completed Module 3: React Hooks",
  },
  {
    id: "data-science",
    title: "Data Science Fundamentals",
    progress: 42,
    lastAccessed: "2024-03-13",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    nextLesson: "Statistical Analysis",
    totalLessons: 32,
    completedLessons: 13,
    instructor: "Dr. Emily Chen",
    lastActivity: "Quiz: Python Basics",
  },
  {
    id: "data-science",
    title: "Data Science Fundamentals",
    progress: 42,
    lastAccessed: "2024-03-13",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    nextLesson: "Statistical Analysis",
    totalLessons: 32,
    completedLessons: 13,
    instructor: "Dr. Emily Chen",
    lastActivity: "Quiz: Python Basics",
  },
];

// Mock data for suggested courses
const suggestedCourses = [
  {
    id: "machine-learning",
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Sarah Chen",
    rating: 4.9,
    students: 2300,
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    price: "$89.99",
    duration: "12 weeks",
  },
  {
    id: "machine-learning",
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Sarah Chen",
    rating: 4.9,
    students: 2300,
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    price: "$89.99",
    duration: "12 weeks",
  },

  {
    id: "mobile-dev",
    title: "Mobile App Development",
    instructor: "Mike Johnson",
    rating: 4.8,
    students: 1800,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    price: "$79.99",
    duration: "10 weeks",
  },
];

const achievements = [
  { title: "Fast Learner", description: "Completed 5 lessons in one day", icon: Zap },
  { title: "Consistent", description: "7-day study streak", icon: TrendingUp },
  { title: "Top Student", description: "Scored 100% in quiz", icon: Award },
];

export const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}/progress`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
          {/* Background Pattern */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
              <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid" />
            </div>
            <div className="relative h-40 overflow-hidden">
              <motion.div className="absolute inset-0 flex items-center justify-center opacity-10" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }}>
                <div className="w-96 h-96 bg-white/20 rounded-full blur-2xl" />
              </motion.div>
            </div>
          </div>

          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:space-x-8">
              {/* Profile Avatar */}
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div className="w-40 h-40  rounded-2xl border-4 border-white bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-1 shadow-xl">
                  <div className="w-full h-full rounded-xl bg-white flex items-center justify-center overflow-hidden">
                    <User className="w-20 h-20  text-indigo-600" />
                  </div>
                </div>
                <motion.div className="absolute -bottom-2 -right-2 bg-green-400 rounded-full p-2 border-2 border-white" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </motion.div>
              </motion.div>

              {/* User Info */}
              <div className="mt-6 sm:mt-0 text-center sm:text-left flex-grow">
                <div
                  className="p-6 rounded-2xl bg-white/50 border border-white/30 shadow-lg 
                              backdrop-blur-xl backdrop-saturate-150 
                              bg-gradient-to-br from-white/50 via-white/30 to-white/20
                              hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4 relative">
                    <h1
                      className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                                 text-transparent bg-clip-text relative z-10"
                    >
                      {user?.name}
                    </h1>
                    <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }} className="p-2 rounded-full bg-yellow-400/20 backdrop-blur-xl">
                      <Award className="w-6 h-6 text-yellow-500" />
                    </motion.div>
                    <div
                      className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl opacity-50 rounded-full"
                    />
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center space-x-2 text-gray-700 p-2 ">
                      <Mail className="w-4 h-4" />
                      <p className="text">{user?.email}</p>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-700 p-2 ">
                      <Calendar className="w-4 h-4" />
                      <p className="text">Member since March 2024</p>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 
                                to-pink-500/10 rounded-2xl blur-3xl -z-10"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 sm:mt-0  z-10 grid grid-cols-3 gap-4 sm:gap-6">
                <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  </div>
                  <p className="text-2xl font-bold text-indigo-600 text-center">2</p>
                  <p className="text-xs text-gray-500 text-center">Active Courses</p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600 text-center">15</p>
                  <p className="text-xs text-gray-500 text-center">Hours Spent</p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600 text-center">92%</p>
                  <p className="text-xs text-gray-500 text-center">Completion Rate</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Current Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Target} iconColor="text-indigo-600" bgColor="bg-indigo-100" label="Weekly Goal" value="8/10 hrs" />
          <StatCard icon={Bookmark} iconColor="text-green-600" bgColor="bg-green-100" label="Assignments" value="5 Pending" />
          <StatCard icon={Trophy} iconColor="text-yellow-600" bgColor="bg-yellow-100" label="Achievements" value="12 Earned" />
          <StatCard icon={BarChart} iconColor="text-purple-600" bgColor="bg-purple-100" label="Average Score" value="92%" />
        </div>

        {/* Ongoing Courses */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Ongoing Courses</h2>
            <Link to="/courses" className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
              View All Courses
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <EnrolledCourseCard key={course.id} course={course} onCourseClick={handleCourseClick} />
            ))}
          </div>
        </motion.div>

        {/* Learning Activity & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Activity */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Activity</h2>
              <div className="space-y-6">
                {/* Activity Timeline */}
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                  {enrolledCourses.map((course, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="relative pl-10 pb-6">
                      <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white" />
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{course.lastActivity}</p>
                        <p className="text-sm text-gray-500 mt-2">{course.lastAccessed}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Study Statistics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Study Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                    <Book className="w-8 h-8 text-indigo-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                  <p className="text-sm text-gray-600">Lessons Completed</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">15h</p>
                  <p className="text-sm text-gray-600">Study Time</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                  <p className="text-sm text-gray-600">Average Score</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                  <p className="text-sm text-gray-600">Group Projects</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">Live Q&A Session</p>
                  <p className="text-sm text-gray-500">Tomorrow, 2:00 PM</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">Group Project Meeting</p>
                  <p className="text-sm text-gray-500">March 18, 3:00 PM</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">Assignment Deadline</p>
                  <p className="text-sm text-gray-500">March 20, 11:59 PM</p>
                </motion.div>
              </div>
            </div>
            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.02 }} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <achievement.icon className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-900">{achievement.title}</p>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <motion.a whileHover={{ scale: 1.02 }} href="#" className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-700">Course Materials</span>
                </motion.a>
                <motion.a whileHover={{ scale: 1.02 }} href="#" className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-700">Study Groups</span>
                </motion.a>
                <motion.a whileHover={{ scale: 1.02 }} href="#" className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <Bell className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-700">Notifications</span>
                </motion.a>
              </div>
            </div>
            {/* Suggested Courses */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Suggested Courses</h3>
                <Link to="/courses" className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center">
                  See More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                {suggestedCourses.slice(0, 3).map((course) => (
                  <motion.div key={course.id} whileHover={{ scale: 1.02 }} className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-20">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover rounded-l-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{course.title}</h4>
                        <p className="text-xs text-gray-500">{course.instructor}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-xs text-gray-600 ml-1">{course.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">•</span>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-600 ml-1">{course.students} students</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-4">
                        <p className="text-sm font-medium text-indigo-600">{course.price}</p>
                        <p className="text-xs text-gray-500">{course.duration}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
