import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';

interface EnrolledCourseCardProps {
  course: {
    id: string;
    title: string;
    image: string;
    instructor: string;
    lastAccessed: string;
    completedLessons: number;
    totalLessons: number;
    progress: number;
    nextLesson: string;
  };
  onCourseClick: (id: string) => void;
}

export const EnrolledCourseCard = ({ course, onCourseClick }: EnrolledCourseCardProps) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }} 
      onClick={() => onCourseClick(course.id)} 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
    >
      <div className="relative h-48">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
          <p className="text-sm text-gray-200">by {course.instructor}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">Last accessed: {course.lastAccessed}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">
              {course.completedLessons}/{course.totalLessons} Lessons
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Course Progress</span>
            <span className="text-sm font-medium text-indigo-600">{course.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${course.progress}%` }} 
              transition={{ duration: 1 }} 
              className="h-full bg-indigo-600 rounded-full" 
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Next Lesson:</p>
            <p className="text-sm text-gray-600">{course.nextLesson}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.stopPropagation();
              onCourseClick(course.id);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg
                     hover:bg-indigo-700 transition-colors"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};