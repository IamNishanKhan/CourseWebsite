import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { CourseCard } from "../components/CourseCard";
import { BookOpen, Search } from "lucide-react";

interface Course {
  course_id: number;
  instructor_name: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string | null;
  created_at: string;
  category: number;
}

interface Category {
  category_id: number;
  category_name: string;
  courses: Course[];
}

export const Courses = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchCategoriesAndCourses = async () => {
      try {
        const { data: categoriesData } = await axios.get<Category[]>(
          "http://127.0.0.1:8000/api/categories/"
        );

        const { data: coursesData } = await axios.get<Course[]>(
          "http://127.0.0.1:8000/api/courses/"
        );

        if (!isMounted) return;

        const updatedCategories = categoriesData.map((category) => ({
          ...category,
          courses: coursesData.filter(
            (course) => course.category === category.category_id
          ),
        }));

        setCategories(updatedCategories);
        if (updatedCategories.length > 0) {
          setActiveCategory(updatedCategories[0].category_id);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load courses.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategoriesAndCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCourses = categories
    .find((cat) => cat.category_id === activeCategory)
    ?.courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <BookOpen className="w-12 h-12 text-indigo-600" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-indigo-600 underline hover:text-indigo-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
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

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div className="flex justify-center mb-12 overflow-x-auto py-4">
            <div className="inline-flex p-1 space-x-1 bg-white rounded-xl shadow-md">
              {categories.map((category) => (
                <motion.button
                  key={category.category_id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(category.category_id)}
                  className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap
                    ${
                      activeCategory === category.category_id
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                >
                  {category.category_name}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Courses Grid */}
        <AnimatePresence mode="wait">
          {filteredCourses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or browse different categories
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory?.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.course_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CourseCard {...course} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};