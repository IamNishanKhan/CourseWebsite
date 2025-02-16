import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
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
  course_title,
  description,
  thumbnail,
  price,
}) => {
  return (
    <Link to={`/course/${course_id}`}>
      <motion.div whileHover={{ y: -8 }} className="bg-white rounded-xl shadow-md">
        <div className="h-48 overflow-hidden rounded-t-xl">
          <img
            src={thumbnail || "https://via.placeholder.com/400x300"}
            alt={course_title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 line-clamp-2">{course_title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{instructor_name}</span>
            </div>
            <span className="text-indigo-600 font-semibold">${price}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
