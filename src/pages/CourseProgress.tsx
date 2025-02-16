import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  BookOpen,
  PlayCircle,
  Download,
  ChevronDown,
  GraduationCap,
} from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';

import { useAuth } from '../contexts/AuthContext';  // Add this import at the top
import { Navigate } from 'react-router-dom';

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

export const CourseProgress = () => {
  const { id } = useParams();
  const { accessToken, isAuthenticated } = useAuth();
  const [course, setCourse] = useState<EnrolledCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/enrolled-course/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        // Add dummy progress data
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
        if (courseData.modules[0]?.lessons[0]?.videos[0]) {
          setSelectedVideo(courseData.modules[0].lessons[0].videos[0]);
        }
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

    if (id && accessToken) {
      fetchCourseData();
    }
  }, [id, accessToken]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.course_title}</h1>
              <p className="text-lg text-gray-600 mb-2">Instructor: {course.instructor_name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600">
                  {course.progress?.percentage ?? defaultProgress.percentage}%
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="h-16 w-16 rounded-full border-4 border-indigo-100 flex items-center justify-center">
                <div 
                  className="h-14 w-14 rounded-full border-4 border-indigo-600"
                  style={{
                    background: `conic-gradient(#4f46e5 ${(course.progress?.percentage ?? 0) * 3.6}deg, #e0e7ff ${(course.progress?.percentage ?? 0) * 3.6}deg)`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Column */}
          <div className="lg:col-span-2 space-y-6">
            {selectedVideo ? (
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
                      className="w-full h-[540px] rounded-t-xl"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedVideo.video_title}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.progress.video_progress.find(v => v.video_id === selectedVideo.video_id)?.completed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {course.progress.video_progress.find(v => v.video_id === selectedVideo.video_id)?.completed
                        ? 'Completed'
                        : 'In Progress'}
                    </span>
                  </div>
                  <p className="text-gray-600">{course.description}</p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <GraduationCap className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">No video selected</h3>
                <p className="text-gray-600">Please select a video from the course content</p>
              </div>
            )}
          </div>

          {/* Course Content Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  course.progress.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {course.progress.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
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
                          <BookOpen className="w-5 h-5 text-indigo-600" />
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
                          <div key={lesson.lesson_id} className="space-y-3">
                            <h3 className="font-semibold text-gray-900">{lesson.lesson_title}</h3>
                            <div className="space-y-2">
                              {lesson.videos.map((video) => (
                                <motion.button
                                  key={video.video_id}
                                  onClick={() => setSelectedVideo(video)}
                                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left
                                    ${selectedVideo?.video_id === video.video_id
                                      ? 'bg-indigo-50 text-indigo-600'
                                      : 'hover:bg-gray-50 text-gray-600 hover:text-indigo-600'
                                    } transition-colors duration-200`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <PlayCircle className="w-5 h-5 flex-shrink-0" />
                                    <div>
                                      <span className="text-sm">{video.video_title}</span>
                                      <div className="flex items-center mt-1">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                          course.progress.video_progress.find(v => v.video_id === video.video_id)?.completed
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                          {course.progress.video_progress.find(v => v.video_id === video.video_id)?.completed
                                            ? 'Completed'
                                            : 'Not completed'}
                                        </span>
                                       
                                        
                                      </div>
                                    </div>
                                  </div>
                                  {course.progress.video_progress.find(v => v.video_id === video.video_id)?.completed && (
                                    <span className="text-green-600">✓</span>
                                  )}
                                </motion.button>
                              ))}
                              {lesson.resources.map((resource) => (
                                <a
                                  key={resource.resource_id}
                                  href={resource.resource_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-3 p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors duration-200"
                                >
                                  <Download className="w-5 h-5 flex-shrink-0" />
                                  <span className="text-sm">{resource.resource_title}</span>
                                </a>
                              ))}
                            </div>
                          </div>
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