import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, User, Tag } from "lucide-react";

interface Course {
  course_id: number;
  category: number;
  category_name: string;
  instructor_name: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string | null;
  created_at: string;
}

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <div className="relative h-48">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}

        {/* Dark Gradient Overlay for Better Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Course Title */}
        <div className="absolute bottom-12 left-4 right-4">
          <h3 className="text-lg font-bold text-white">{course.title}</h3>
        </div>

        {/* Instructor Name (Bottom Left) & Category (Bottom Right) */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
          <User className="w-5 h-5 opacity-80" />
          <span className="text-sm font-medium opacity-90">{course.instructor_name}</span>
        </div>

        <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white">
          <Tag className="w-5 h-5 opacity-80" />
          <span className="text-sm font-medium opacity-90">{course.category_name}</span>
        </div>
      </div>

      {/* Description with Proper Truncation */}
      <div className="p-6 flex-1">
        <p className="text-gray-600 mb-4 line-clamp-3">
          {course.description}
        </p>
      </div>

      {/* Footer with Price & Button */}
      <div className="p-6 flex items-center justify-between border-t border-gray-200">
        <span className="text-2xl font-bold text-indigo-600">৳{course.price}</span>
        <Link to={`/course/${course.course_id}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};
