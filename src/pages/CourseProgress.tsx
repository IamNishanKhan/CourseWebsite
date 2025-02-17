import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import {
  BookOpen,
  PlayCircle,
  Download,
  ChevronDown,
  
  User,
  Tag,
  Clock,
  
  
  LibraryBig,
} from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';

import { useAuth } from '../contexts/AuthContext';  // Add this import at the top


interface Video {
  video_id: number;
  lesson_id: number;
  video_title: string;
  video_link: string;
}

interface Resource {
  resource_id: number;
  lesson_id: number;
  resource_title: string;
  resource_link: string;
}

interface Lesson {
  lesson_id: number;
  module_id: number;
  lesson_title: string;
  order: number;
  created_at: string;
  videos: Video[];
  resources: Resource[];
}

interface Module {
  module_id: number;
  course_id: number;
  module_title: string;
  order: number;
  lessons: Lesson[];
}

// Add this interface after other interfaces
interface VideoProgress {
  video_id: number;
  completed: boolean;
  last_watched: string | null;
}

// Update the EnrolledCourse interface to include progress
interface EnrolledCourse {
  course_id: number;
  course_title: string;
  description: string;
  price: string;
  thumbnail:string;
  category_id: number;
  category_name: string;
  instructor_name: string;
  modules: Module[];
  outcomes: string[];
  prerequisites: string[];
  progress: {
    completed_videos: number;
    total_videos: number;
    percentage: number;
    status: 'in_progress' | 'completed';
    video_progress: VideoProgress[];
  };
}

// Add this utility function at the top of the file, before the interfaces
const getYouTubeVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : '';
};

import { api } from '../lib/axios'; // Add this import

export const CourseProgress = () => {
  const { id } = useParams();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const location = useLocation(); // Now this will work
  const [course, setCourse] = useState<EnrolledCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/enrolled-course/${id}/`);
        const courseData = response.data;
        
        const totalVideos = courseData.modules.reduce(
          (total, module) => total + module.lessons.reduce(
            (lessonTotal, lesson) => lessonTotal + lesson.videos.length, 0
          ), 0
        );
        
        const dummyProgress = {
          completed_videos: Math.floor(totalVideos * 0.3), // 30% completion
          total_videos: totalVideos,
          percentage: Math.floor((totalVideos * 0.3) / totalVideos * 100),
          status: 'in_progress' as const,
          video_progress: courseData.modules.flatMap(module =>
            module.lessons.flatMap(lesson =>
              lesson.videos.map(video => ({
                video_id: video.video_id,
                completed: Math.random() > 0.7, // 30% chance of being completed
                last_watched: new Date().toISOString()
              }))
            )
          )
        };
        
        setCourse({ ...courseData, progress: dummyProgress });
        // Remove this part:
        // if (courseData.modules[0]?.lessons[0]?.videos[0]) {
        //   setSelectedVideo(courseData.modules[0].lessons[0].videos[0]);
        // }
      } catch (err) {
        console.error('Error fetching course data:', err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setError('Please login to access this course');
          } else if (err.response?.status === 403) {
            setError('You do not have access to this course');
          } else {
            setError('Failed to load course content');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have completed auth initialization and are authenticated
    if (!authLoading && isAuthenticated) {
      fetchCourseData();
    }
  }, [id, authLoading, isAuthenticated]); // Add authLoading and isAuthenticated to dependencies

  // Wait for auth to initialize before checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-gray-200 rounded-xl" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check authentication after auth is initialized
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: `/course/${id}/progress` }} replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-gray-200 rounded-xl" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  // Add default progress values
  const defaultProgress = {
    completed_videos: 0,
    total_videos: 0,
    percentage: 0,
    status: 'in_progress' as const,
    video_progress: []
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
             src={`http://127.0.0.1:8000${course.thumbnail}`}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center mb-4 px-4 py-2 rounded-full 
                          bg-white/10 backdrop-blur-md border border-white/20"
              >
                <Tag className="w-4 h-4 text-white mr-2" />
                <span className="text-sm font-medium text-white">{course.category_name}</span>
              </motion.div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {course.course_title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                {/* Instructor */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center space-x-2"
                >
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-md">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-lg">{course.instructor_name}</span>
                </motion.div>

               

                {/* Total Videos */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center space-x-2"
                >
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-md">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-lg">{course.progress.total_videos} Videos</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Column */}
          <div className="lg:col-span-2 space-y-6">
            {selectedVideo ? (
              <div className="space-y-6"> {/* Added wrapper div with spacing */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="relative w-full" style={{ maxWidth: '960px', margin: '0 auto' }}>
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedVideo.video_link)}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-auto rounded-t-xl"
                      />
                    </div>
                  </div>
                </motion.div>
            
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className=" rounded-xl  bg-white shadow-lg p-6"
                >
                  <div className="flex items-center justify-start">
                    <h2 className="text-2xl  font-bold text-gray-900">
                      {selectedVideo.video_title}
                    </h2>
                  </div>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-12 text-center"
              >
                <div className="flex flex-col items-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <PlayCircle className="w-24 h-24 text-indigo-600/30" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      Ready to Start Learning?
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Select a lesson from the course content to begin your learning journey.
                      The video player will appear here once you choose a video.
                    </p>
                  </div>
                  
                </div>
              </motion.div>
            )}
          </div>

          {/* Course Content Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
                
              </div>
              
              <Accordion.Root type="single" collapsible className="space-y-4">
                {course.modules.map((module) => (
                  <Accordion.Item
                    key={module.module_id}
                    value={`module-${module.module_id}`}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:border-indigo-200 transition-all duration-300"
                  >
                    <Accordion.Trigger className="w-full flex justify-between items-center p-4 text-left group">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-200">
                          <LibraryBig className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                            {module.module_title}
                          </span>
                          <p className="text-sm text-gray-500">
                            {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
                          </p>
                        </div>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-500 transform transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                    
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                      <div className="p-4 bg-white space-y-4">
                        {module.lessons.map((lesson) => (
                          <Accordion.Root
                            key={lesson.lesson_id}
                            type="single"
                            collapsible
                          >
                            <Accordion.Item value={`lesson-${lesson.lesson_id}`}>
                              <Accordion.Trigger className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white group hover:from-indigo-50 hover:to-white transition-all duration-300 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 rounded-lg bg-indigo-100/50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-200">
                                    <BookOpen className="w-4 h-4 text-indigo-600" />
                                  </div>
                                  <span className="text-sm text-left text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">
                                    {lesson.lesson_title}
                                  </span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400 transform transition-transform duration-200 group-data-[state=open]:rotate-180" />
                              </Accordion.Trigger>
                              
                              <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                <div className="p-3 space-y-2 pl-11">
                                  {lesson.videos.map((video) => (
                                    <motion.button
                                      key={video.video_id}
                                      onClick={() => setSelectedVideo(video)}
                                      whileHover={{ x: 4 }}
                                      className={`w-full flex items-center p-2 rounded-lg text-left
                                        ${selectedVideo?.video_id === video.video_id
                                          ? 'bg-indigo-50 text-indigo-600'
                                          : 'hover:bg-gray-50 text-gray-600 hover:text-indigo-600'
                                        } transition-all duration-200`}
                                    >
                                      <div className="flex items-center space-x-3">
                                        <PlayCircle className="w-4 h-4 flex-shrink-0" />
                                        <span className="text-sm">{video.video_title}</span>
                                      </div>
                                    </motion.button>
                                  ))}
                                  {lesson.resources.map((resource) => (
                                    <motion.a
                                      key={resource.resource_id}
                                      href={resource.resource_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      whileHover={{ x: 4 }}
                                      className="w-full flex items-center space-x-3 p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-200"
                                    >
                                      <Download className="w-4 h-4 flex-shrink-0" />
                                      <span className="text-sm">{resource.resource_title}</span>
                                    </motion.a>
                                  ))}
                                </div>
                              </Accordion.Content>
                            </Accordion.Item>
                          </Accordion.Root>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};