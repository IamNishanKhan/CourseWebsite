import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import {
  BookOpen,
  CheckCircle,
  Clock,
  Target,
  PlayCircle,
  XCircle,
  GraduationCap,
} from 'lucide-react';

interface Module {
  module_id: number;
  title: string;
  order: number;
  course_id: number;
  course_name: string;
  created_at: string;
  updated_at: string;
}

interface Lesson {
  lesson_id: number;
  title: string;
  video_url: string;
  duration: number;
  order: number;
  created_at: string;
  updated_at: string;
  module: number;
}

export const CourseProgress = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const [modulesResponse, lessonsResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/modules/', {
            headers: { Authorization: `Bearer ${accessToken}` }
          }),
          axios.get('http://127.0.0.1:8000/api/lessons/', {
            headers: { Authorization: `Bearer ${accessToken}` }
          })
        ]);

        // Filter modules for the current course
        const courseModules = modulesResponse.data.filter(
          (module: Module) => module.course_id === Number(id)
        ).sort((a: Module, b: Module) => a.order - b.order);

        setModules(courseModules);
        setLessons(lessonsResponse.data.sort((a: Lesson, b: Lesson) => a.order - b.order));
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError('Failed to load course content');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id, accessToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-xl mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32" />
          <div className="px-8 py-6 -mt-16">
            <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-32 h-32 rounded-xl shadow-lg bg-white p-4 flex items-center justify-center"
              >
                <GraduationCap className="w-16 h-16 text-indigo-600" />
              </motion.div>
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-3xl font-bold text-white md:text-gray-900">
                  {modules[0]?.course_name || 'Course Content'}
                </h1>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modules and Lessons */}
        <div className="space-y-6">
          {modules.map((module) => (
            <motion.div
              key={module.module_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {module.title}
                  </h3>
                </div>
              </div>
              
              <div className="space-y-2">
                {lessons
                  .filter((lesson) => lesson.module === module.module_id)
                  .map((lesson) => (
                    <motion.div
                      key={lesson.lesson_id}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-5 h-5 text-indigo-500" />
                        <span className="text-gray-700">{lesson.title}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {lesson.duration} min
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 text-sm text-indigo-600 border border-indigo-600 
                                   rounded-full hover:bg-indigo-50"
                          onClick={() => window.open(lesson.video_url, '_blank')}
                        >
                          Start
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};