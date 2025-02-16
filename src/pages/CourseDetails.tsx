import  { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, Star, ChevronDown, BookOpen,PlayCircle } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import axios from "axios";


interface Video {
  video_id: number;
  lesson_id: number;
  video_title: string;
}

interface Resource {
  resource_id: number;
  lesson_id: number;
  resource_title: string;
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

interface CourseDetails {
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
}

export const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/course-details/${id}`);
        setCourse(response.data);
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError("Failed to load course content");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id]);

  // ... loading and error states remain the same ...

  if (!course) return null;

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const totalVideos = course.modules.reduce((acc, module) => acc + module.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.videos.length, 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Title and Meta */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.course_title}</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-semibold text-gray-900">{course.instructor_name}</p>
                <p className="text-sm text-gray-500">Instructor</p>
              </div>
            </div>
            <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm font-medium">{course.category_name}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Content */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            {/* Course Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Description</h2>
              <p className="text-gray-600 leading-relaxed">{course.description}</p>
            </div>

            {/* Course Content */}

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
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
                          <motion.div
                            key={lesson.lesson_id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-lg border border-gray-100 hover:border-indigo-100 transition-all duration-200"
                          >
                            <div className="p-4">
                              <h4 className="font-semibold text-gray-900 mb-3">{lesson.lesson_title}</h4>
                              {lesson.videos.length > 0 && (
                                <div className="space-y-2">
                                  {lesson.videos.map((video) => (
                                    <div 
                                      key={video.video_id}
                                      className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                                    >
                                      <PlayCircle className="w-4 h-4 flex-shrink-0" />
                                      <span className="text-sm">{video.video_title}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </motion.div>

          {/* Right Column - Course Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-indigo-600 mb-2">${parseFloat(course.price).toFixed(2)}</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold
                           hover:bg-indigo-700 transition-colors mb-4"
                >
                  Enroll Now
                </motion.button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Total Modules</span>
                  </div>
                  <span className="font-semibold">{course.modules.length}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Total Lessons</span>
                  </div>
                  <span className="font-semibold">{totalLessons}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-600">Total Videos</span>
                  </div>
                  <span className="font-semibold">{totalVideos}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
