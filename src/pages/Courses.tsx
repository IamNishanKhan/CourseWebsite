import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { CourseCard } from "../components/CourseCard";

interface Course {
  course_id: number;
  course_title: string;
  description: string;
  price: string;
  thumbnail: string | null;
  category_name: string;
  category: number;
  instructor_name: string;
  title: string;
  created_at: string;
}

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/courses/")
      .then((response) => response.json())
      .then((data: Course[]) => {
        console.log("Fetched Courses:", data); // ✅ Debugging log
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses.");
      });
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.course_title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeCategory === "All" || course.category_name === activeCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover your next learning adventure
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex p-1 space-x-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg"
          >
            <motion.button
              key="all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory("All")}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200
                        ${
                          activeCategory === "All"
                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
            >
              All
            </motion.button>
            {Array.from(new Set(courses.map((course) => course.category_name))).map(
              (category, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200
                          ${
                            activeCategory === category
                              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                >
                  {category}
                </motion.button>
              )
            )}
          </motion.div>
        </div>

        {/* Display Error */}
        {error && (
          <p className="text-red-500 text-center mb-6">{error}</p>
        )}

        {/* Courses Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.course_id} course={course} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No courses available
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
