import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Clock, Star, ChevronDown, BookOpen } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

interface Category {
  category_id: number;
  category_name: string;
  created_at: string;
}

interface Course {
  course_id: number;
  instructor_id: number;
  instructor_name: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  category: number;
}

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

// Add these imports at the top
import { useNavigate } from 'react-router-dom';

// Add this interface with the existing interfaces
interface Enrollment {
  enrollment_id: number;
  course: Course;
  enrolled_at: string;
}

export const CourseDetails = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const [coursesRes, categoriesRes, modulesRes, lessonsRes, enrollmentsRes] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/courses/`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          }),
          axios.get("http://127.0.0.1:8000/api/categories/", {
            headers: { Authorization: `Bearer ${accessToken}` }
          }),
          axios.get("http://127.0.0.1:8000/api/modules/", {
            headers: { Authorization: `Bearer ${accessToken}` }
          }),
          axios.get("http://127.0.0.1:8000/api/lessons/", {
            headers: { Authorization: `Bearer ${accessToken}` }
          }),
          axios.get("http://127.0.0.1:8000/api/enrollments/", {
            headers: { Authorization: `Bearer ${accessToken}` }
          })
        ]);

        const currentCourse = coursesRes.data.find((c: Course) => c.course_id === Number(id));
        if (!currentCourse) {
          throw new Error("Course not found");
        }
        setCourse(currentCourse);

        const courseCategory = categoriesRes.data.find((cat: Category) => cat.category_id === currentCourse.category);
        setCategory(courseCategory);

        const courseModules = modulesRes.data.filter((module: Module) => module.course_id === Number(id)).sort((a: Module, b: Module) => a.order - b.order);
        setModules(courseModules);

        setLessons(lessonsRes.data.sort((a: Lesson, b: Lesson) => a.order - b.order));
        // Check if user is enrolled in this course
        const isUserEnrolled = enrollmentsRes.data.some(
          (enrollment: Enrollment) => enrollment.course.course_id === Number(id)
        );
        setIsEnrolled(isUserEnrolled);

      } catch (err) {
        console.error("Error fetching course data:", err);
        setError("Failed to load course content");
      } finally {
        setLoading(false);
      }
    };

    if (id && accessToken) {
      fetchCourseData();
    }
  }, [id, accessToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded-xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-[400px] bg-gray-200 rounded-xl"></div>
                <div className="h-40 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
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
          <div className="text-center text-red-600">{error || "Course not found"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Title and Meta */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-semibold text-gray-900">{course.instructor_name}</p>
                <p className="text-sm text-gray-500">Instructor</p>
              </div>
            </div>
            {category && <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm font-medium">{category.category_name}</span>}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Image and Details */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <img src={course.thumbnail} alt={course.title} className="w-full h-[400px] object-cover" />
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Description</h2>
              <p className="text-gray-600 leading-relaxed">{course.description}</p>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
              <Accordion.Root type="single" collapsible className="space-y-4">
                {modules.map((module) => (
                  <Accordion.Item key={module.module_id} value={`module-${module.module_id}`} className="bg-gray-50 rounded-lg overflow-hidden">
                    <Accordion.Trigger className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-100">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        <span className="font-semibold text-gray-900">{module.title}</span>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-500 transform transition-transform duration-200" />
                    </Accordion.Trigger>
                    <Accordion.Content className="p-4 bg-white">
                      <ul className="space-y-2">
                        {lessons
                          .filter((lesson) => lesson.module === module.module_id)
                          .map((lesson) => (
                            <li key={lesson.lesson_id} className="flex items-center justify-between p-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                                <span className="text-gray-600">{lesson.title}</span>
                              </div>
                              <span className="text-sm text-gray-500">{lesson.duration} min</span>
                            </li>
                          ))}
                      </ul>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </motion.div>

          {/* Right Column - Enrollment Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-indigo-600 mb-2">
                  {isEnrolled ? "Enrolled" : `$${parseFloat(course.price).toFixed(2)}`}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => isEnrolled && navigate(`/course/${id}/progress`)}
                  className={`w-full py-4 ${
                    isEnrolled
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white rounded-lg font-semibold transition-colors mb-4`}
                >
                  {isEnrolled ? 'Go to Course' : 'Enroll Now'}
                </motion.button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Total Duration</span>
                  </div>
                  <span className="font-semibold">{lessons.reduce((acc, lesson) => acc + lesson.duration, 0)} min</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Modules</span>
                  </div>
                  <span className="font-semibold">{modules.length}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-600">Last Updated</span>
                  </div>
                  <span className="font-semibold">{new Date(course.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
