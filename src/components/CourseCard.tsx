import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, User, Tag } from "lucide-react";

// Update the interfaces
interface Course {
  course_id: number;
  category: number;
  category_name: string;
  instructor_name: string;
  course_title: string;
  description: string;
  price: string;
  thumbnail: string | null;
  created_at: string;
  isEnrolled?: boolean; // Add this optional property
}

interface CourseCardProps {
  course: Course;
  onContinue?: () => void; // Add this optional prop
}


// Add this utility function at the top of the file
const getInstructorAvatar = (name: string) => {
  const formattedName = name.replace(/\s+/g, '+');
  return `https://avatar.iran.liara.run/username?username=${formattedName}`;
};

export const CourseCard: React.FC<CourseCardProps> = ({ course, onContinue }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-[24rem]">
      <div className="relative h-48 flex-shrink-0">
        {course.thumbnail ? (
          <img 
            src={`${course.thumbnail}`} 
            alt={course.course_title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}

        {/* Enhanced Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* Enhanced Course Title */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-xl font-bold text-white leading-tight drop-shadow-lg line-clamp-2 mb-2">
            {course.course_title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white bg-gray-100/30 backdrop-blur-xl rounded-full px-2 py-1">
              <img 
                src={getInstructorAvatar(course.instructor_name)}
                alt={course.instructor_name}
                className="w-4 h-4 rounded-full"
              />
              <span className="text-sm font-medium opacity-90">{course.instructor_name}</span>
            </div>
            <div className="flex items-center space-x-2 text-white bg-gray-100/30 rounded-full px-2 py-1">
              <Tag className="w-4 h-4 opacity-80" />
              <span className="text-sm font-medium opacity-90">{course.category_name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description with Fixed Height */}
      <div className="p-6 flex-1 overflow-hidden">
        <p className="text-gray-600 line-clamp-3">{course.description}</p>
      </div>

      {/* Update the footer section */}
      <div className="p-6 mt-auto flex items-center justify-between border-t border-gray-200">
        {!course.isEnrolled && <span className="text-2xl font-bold text-indigo-600">৳{course.price}</span>}
        <div className={course.isEnrolled ? "w-full" : ""}>
          {course.isEnrolled ? (
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onContinue} className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <span>Continue Course</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <Link to={`/course/${course.course_id}`}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};
