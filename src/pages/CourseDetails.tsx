import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Tag, ChevronDown, CheckCircle, BookOpen } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import axios from "axios";

// Add the utility function here, at the top level
const getInstructorAvatar = (name: string) => {
  const formattedName = name.replace(/\s+/g, "+");
  return `https://avatar.iran.liara.run/username?username=${formattedName}`;
};

interface Course {
  course_id: number;
  course_title: string;
  thumbnail: string;
  description: string;
  price: string;
  category_id: number;
  category_name: string;
  instructor_name: string;
  modules: Module[];
  outcomes: Outcome[];
  prerequisites: Prerequisite[];
}

interface Module {
  module_id: number;
  module_title: string;
  lessons: Lesson[];
}

interface Lesson {
  lesson_id: number;
  lesson_title: string;
}

interface Outcome {
  outcome_id: number;
  outcome_title: string;
}

interface Prerequisite {
  prerequisite_id: number;
  prerequisite_title: string;
}

export const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/course-details/${id}/`);
        setCourse(response.data);
      } catch (error) {
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <p className="text-gray-600 text-lg">Loading course details...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <p className="text-red-600 text-lg">{error || "Course not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.course_title}</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <img src={getInstructorAvatar(course.instructor_name)} alt={course.instructor_name} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-semibold text-gray-900">{course.instructor_name}</p>
                <p className="text-sm text-gray-500">Instructor</p>
              </div>
            </div>
            <span className="text-indigo-600 flex bg-indigo-50 px-3 py-1 rounded-full text-sm font-medium">
              <Tag className="w-4 h-5 mr-1 text-indigo-600" />
              {course.category_name}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Image and Details */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <img src={`http://127.0.0.1:8000${course.thumbnail}`} alt={course.course_title} className="w-full h-[400px] object-cover" />
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.outcomes.map((outcome) => (
                  <div key={outcome.outcome_id} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{outcome.outcome_title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Description</h2>
              <p className="text-gray-600 leading-relaxed">{course.description}</p>
            </div>

            {/* Course Content - Modules and Lessons */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
              <Accordion.Root type="single" collapsible className="space-y-4">
                {course.modules.map((module) => (
                  <Accordion.Item key={module.module_id} value={`module-${module.module_id}`} className="bg-gray-50 rounded-lg overflow-hidden">
                    <Accordion.Trigger className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-100">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        <span className="font-semibold text-gray-900">{module.module_title}</span>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-500 transform transition-transform duration-200" />
                    </Accordion.Trigger>
                    <Accordion.Content className="p-4 bg-white">
                      <ul className="space-y-2">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.lesson_id} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                            <span className="text-gray-600">{lesson.lesson_title}</span>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </motion.div>

          {/* Right Column - Enrollment Card & Prerequisites */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              {/* Enroll Now Card */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-3xl font-bold text-center text-indigo-600 mb-4">৳ {course.price}</h3>
                <motion.button whileHover={{ scale: 1.05 }} className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors mb-4">
                  Enroll Now
                </motion.button>
              </motion.div>

              {/* Prerequisites Card */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Prerequisites</h2>
                <ul className="space-y-2">
                  {course.prerequisites.map((prerequisite) => (
                    <li key={prerequisite.prerequisite_id} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-indigo-600" />
                      <span className="text-gray-600">{prerequisite.prerequisite_title}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
