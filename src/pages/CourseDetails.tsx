import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Clock, Users, Star, ChevronDown, CheckCircle, BookOpen } from 'lucide-react';
import * as Accordion from '@radix-ui/react-accordion';

const courseModules = [
  {
    title: "Module 1: Introduction to Programming",
    lessons: [
      "Understanding Programming Fundamentals",
      "Setting Up Your Development Environment",
      "Writing Your First Program",
      "Basic Data Types and Variables"
    ]
  },
  {
    title: "Module 2: Control Structures",
    lessons: [
      "Conditional Statements",
      "Loops and Iterations",
      "Switch Cases",
      "Break and Continue Statements"
    ]
  },
  {
    title: "Module 3: Functions and Methods",
    lessons: [
      "Function Declaration and Definition",
      "Parameters and Return Values",
      "Function Overloading",
      "Recursive Functions"
    ]
  }
];

const learningOutcomes = [
  "Master fundamental programming concepts and principles",
  "Build real-world applications using modern technologies",
  "Understand data structures and algorithms",
  "Learn object-oriented programming practices",
  "Develop problem-solving skills through practical exercises",
  "Gain hands-on experience with databases"
];

const prerequisites = [
  "Basic computer knowledge",
  "Understanding of basic mathematics",
  "Dedication to learn and practice",
  "Access to a computer with internet connection"
];

export const CourseDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Title and Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Web Development Masterclass
          </h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Instructor"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">Senior Web Developer</p>
              </div>
            </div>
            <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm font-medium">
              Web Development
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Image and Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200&q=60"
                alt="Course Cover"
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Course Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This comprehensive course is designed to take you from beginner to professional
                web developer. You'll learn modern web development practices, tools, and
                technologies used in the industry today. Through hands-on projects and
                real-world examples, you'll gain practical experience that you can apply
                immediately in your career.
              </p>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Course Content
              </h2>
              <Accordion.Root type="single" collapsible className="space-y-4">
                {courseModules.map((module, index) => (
                  <Accordion.Item
                    key={index}
                    value={`module-${index}`}
                    className="bg-gray-50 rounded-lg overflow-hidden"
                  >
                    <Accordion.Trigger className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-100">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-5 h-5 text-indigo-600" />
                        <span className="font-semibold text-gray-900">
                          {module.title}
                        </span>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-500 transform transition-transform duration-200" />
                    </Accordion.Trigger>
                    <Accordion.Content className="p-4 bg-white">
                      <ul className="space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                            <span className="text-gray-600">{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>

            {/* Prerequisites */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Prerequisites
              </h2>
              <ul className="space-y-4">
                {prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{prerequisite}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Enrollment Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-indigo-600 mb-2">$99.99</h3>
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
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Duration</span>
                  </div>
                  <span className="font-semibold">12 Weeks</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Enrolled</span>
                  </div>
                  <span className="font-semibold">1,500+ Students</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-600">Rating</span>
                  </div>
                  <span className="font-semibold">4.8 (250 reviews)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};