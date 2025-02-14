import React from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

interface EnrolledCourseCardProps {
  enrollment: {
    enrollment_id: number;
    course: {
      course_id: number;
      instructor_id: number;
      instructor_name: string;
      title: string;
      description: string;
      thumbnail: string;
      price: string;
    };
    enrolled_at: string;
  };
  onCourseClick: (id: number) => void;
}

export const EnrolledCourseCard = ({ enrollment, onCourseClick }: EnrolledCourseCardProps) => {
  const { enrolled_at, course } = enrollment;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
    >
      <div className="relative h-48">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-200">by {course.instructor_name}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            <span className="text-sm text-gray-600">
              Enrolled: {new Date(enrolled_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => onCourseClick(course.course_id)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 
                   text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <span>Continue Learning</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};