import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  students: number;
  rating: number;
  price: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  image,
  duration,
  students,
  rating,
  price,
}) => {
  return (
    <Link to={`/course/${id}`}>
      <motion.div
        whileHover={{ y: -10 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300
                  hover:shadow-2xl cursor-pointer"
      >
        <div className="relative h-48">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <Tooltip content="Course Duration">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
            </Tooltip>
            
            <Tooltip content="Enrolled Students">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{students}+ students</span>
              </div>
            </Tooltip>
            
            <Tooltip content="Course Rating">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{rating}</span>
              </div>
            </Tooltip>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-indigo-600">{price}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700
                       transition-colors"
            >
              Enroll Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};