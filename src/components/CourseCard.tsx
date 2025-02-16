import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course_id: number;
  instructor_name: string;
  course_title: string;
  description: string;
  thumbnail: string | null;
  price: string;
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
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white/30 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden 
                  border border-white/20 hover:shadow-2xl hover:border-indigo-200/50 
                  transition-all duration-300 h-full flex flex-col"
      >
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"}
            alt={title}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Price Tag */}
          <div className="absolute top-4 right-4">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20
                          text-white font-semibold shadow-lg">
              ${price}
            </div>
          </div>

          {/* Course Meta */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                ))}
              </div>
              <span className="text-white text-sm">+24 enrolled</span>
            </div>
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-white text-sm">4.8</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col relative z-10">
          <div className="flex items-center space-x-2 mb-3">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full">
              Best Seller
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full">
              Updated
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 
                         transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{description}</p>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="truncate">{instructor_name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>12 Lessons</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>6h 30m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
