import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { CheckCircle, Target, PlayCircle, XCircle, Award, GraduationCap, Zap, ChevronDown } from "lucide-react";

const courseData = {
  id: "web-development",
  title: "Web Development Masterclass",
  instructor: "John Smith",
  progress: 65,
  totalHours: 48,
  completedHours: 31,
  lastAccessed: "2024-03-15",
  nextDeadline: "2024-03-20",
  certificateProgress: 65,
  modules: [
    {
      id: 1,
      title: "Introduction to Web Development",
      completed: true,
      lessons: [
        { id: 1, title: "Welcome to the Course", completed: true, duration: "15 min" },
        { id: 2, title: "Setting Up Your Environment", completed: true, duration: "25 min" },
        { id: 3, title: "Web Development Overview", completed: true, duration: "30 min" },
      ],
    },
    {
      id: 2,
      title: "HTML & CSS Fundamentals",
      completed: true,
      lessons: [
        { id: 4, title: "HTML Basics", completed: true, duration: "45 min" },
        { id: 5, title: "CSS Styling", completed: true, duration: "50 min" },
        { id: 6, title: "Responsive Design", completed: true, duration: "40 min" },
      ],
    },
    {
      id: 3,
      title: "JavaScript Essentials",
      completed: false,
      lessons: [
        { id: 7, title: "JavaScript Basics", completed: true, duration: "45 min" },
        { id: 8, title: "DOM Manipulation", completed: false, duration: "40 min" },
        { id: 9, title: "Events and Listeners", completed: false, duration: "35 min" },
      ],
    },
    {
      id: 4,
      title: "React Framework",
      completed: false,
      lessons: [
        { id: 10, title: "React Introduction", completed: false, duration: "30 min" },
        { id: 11, title: "Components and Props", completed: false, duration: "45 min" },
        { id: 12, title: "State Management", completed: false, duration: "50 min" },
      ],
    },
  ],
  achievements: [
    { id: 1, title: "Fast Learner", description: "Completed 3 lessons in one day", icon: Zap },
    { id: 2, title: "Perfect Score", description: "Scored 100% in module quiz", icon: Award },
    { id: 3, title: "Consistent", description: "7-day study streak", icon: Target },
  ],
  skills: [
    { name: "HTML", progress: 90 },
    { name: "CSS", progress: 85 },
    { name: "JavaScript", progress: 70 },
    { name: "React", progress: 45 },
  ],
};

const ProgressCircle = ({ progress }: { progress: number }) => (
  <div className="relative w-32 h-32">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle className="text-gray-200 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent" />
      <motion.circle className="text-indigo-600 stroke-current" strokeWidth="10" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: progress / 100 }} transition={{ duration: 1, ease: "easeInOut" }} style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} />
      <text x="50" y="50" className="text-2xl font-bold" textAnchor="middle" dy="8" fill="currentColor">
        {progress}%
      </text>
    </svg>
  </div>
);

export const CourseProgress = () => {
  const { id } = useParams();
  const course = courseData;
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32" />
          <div className="px-8 py-6 -mt-16">
            <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="w-32 h-32 rounded-xl shadow-lg bg-white p-4 flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-indigo-600" />
              </motion.div>
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-3xl font-bold text-white md:text-gray-900">{course.title}</h1>
                <p className="text-gray-200 md:text-gray-600">Instructor: {course.instructor}</p>
              </div>
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center space-x-2 cursor-pointer">
                  <PlayCircle className="w-5 h-5" />
                  <span>Continue Learning</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Modules</h2>
              <div className="space-y-6">
                {course.modules.map((module, index) => (
                  <motion.div key={module.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg" onClick={() => toggleModule(module.id)}>
                      <div className="flex items-center space-x-3">
                        {module.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                            <Target className="w-6 h-6 text-indigo-600" />
                          </motion.div>
                        )}
                        <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${module.completed ? "bg-green-100 text-green-800" : "bg-indigo-100 text-indigo-800"}`}>{module.completed ? "Completed" : "In Progress"}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${expandedModules.includes(module.id) ? "rotate-180" : ""}`} />
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedModules.includes(module.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                            transition: { duration: 0.2 },
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                            transition: { duration: 0.2 },
                          }}
                        >
                          <div className="space-y-2 pl-9">
                            {module.lessons.map((lesson) => (
                              <motion.div key={lesson.id} whileHover={{ x: 4 }} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center space-x-3">
                                  {lesson.completed ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-gray-400" />}
                                  <span className={`${lesson.completed ? "text-gray-900" : "text-gray-500"}`}>{lesson.title}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                                  {!lesson.completed && (
                                    <motion.button whileHover={{ scale: 1.05 }} className="px-3 py-1 text-sm text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50">
                                      Start
                                    </motion.button>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Overall Progress</h3>
              <div className="flex justify-center mb-6">
                <ProgressCircle progress={course.progress} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{course.completedHours}</p>
                  <p className="text-sm text-gray-500">Hours Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{course.totalHours}</p>
                  <p className="text-sm text-gray-500">Total Hours</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Skills Progress</h3>
              <div className="space-y-4">
                {course.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm font-medium text-indigo-600">{skill.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${skill.progress}%` }} transition={{ duration: 1, delay: index * 0.1 }} className="h-full bg-indigo-600 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
              <div className="space-y-4">
                {course.achievements.map((achievement, index) => (
                  <motion.div key={achievement.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <achievement.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{achievement.title}</p>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
