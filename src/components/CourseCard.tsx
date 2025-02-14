import React from "react";
import { motion } from "framer-motion";
import { Clock, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course_id: number;
  instructor_name: string;
  title: string;
  description: string;
  thumbnail: string | null;
  price: string;
  created_at: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course_id,
  instructor_name,
  title,
  description,
  thumbnail,
  price,
}) => {
  return (
    <Link to={`/course/${course_id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300
                  hover:shadow-2xl cursor-pointer h-full flex flex-col"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"}
            alt={title}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full">
              ${price}
            </span>
          </div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 flex-grow">{title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{description}</p>

          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span className="truncate">{instructor_name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>12 Lessons</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};