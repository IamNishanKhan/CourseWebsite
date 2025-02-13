import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Star, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Course categories and their corresponding courses
const courseCategories = [
  {
    id: 'programming',
    name: 'Programming',
    courses: [
      {
        id: 'web-development',
        title: 'Web Development Masterclass',
        description: 'Master modern web development with React, Node.js, and more.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        duration: '12 weeks',
        students: 1500,
        rating: 4.8,
        price: '$99.99',
        outcomes: [
          'Build full-stack web applications',
          'Master React and Node.js',
          'Learn database design and implementation',
          'Deploy applications to production'
        ]
      },
      {
        id: 'python-programming',
        title: 'Python Programming: Zero to Hero',
        description: 'Comprehensive Python course covering basics to advanced concepts.',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
        duration: '10 weeks',
        students: 2200,
        rating: 4.9,
        price: '$89.99',
        outcomes: [
          'Master Python fundamentals',
          'Build real-world applications',
          'Understand data structures and algorithms',
          'Create automation scripts'
        ]
      }
    ]
  },
  {
    id: 'data-science',
    name: 'Data Science',
    courses: [
      {
        id: 'data-science-fundamentals',
        title: 'Data Science Fundamentals',
        description: 'Learn data analysis, visualization, and machine learning basics.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
        duration: '14 weeks',
        students: 1200,
        rating: 4.7,
        price: '$129.99',
        outcomes: [
          'Master data analysis techniques',
          'Create compelling visualizations',
          'Build predictive models',
          'Work with real-world datasets'
        ]
      }
    ]
  },
  {
    id: 'design',
    name: 'Design',
    courses: [
      {
        id: 'ui-ux-design',
        title: 'UI/UX Design Professional',
        description: 'Master modern design principles and tools.',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
        duration: '8 weeks',
        students: 900,
        rating: 4.9,
        price: '$79.99',
        outcomes: [
          'Create beautiful user interfaces',
          'Master design principles',
          'Build interactive prototypes',
          'Conduct user research'
        ]
      }
    ]
  }
];

export const Courses = () => {
  const [activeCategory, setActiveCategory] = useState(courseCategories[0].id);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of professional courses designed to help you
            achieve your career goals.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 space-x-1 bg-white rounded-xl shadow-md">
            {courseCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                          ${activeCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {courseCategories
              .find((cat) => cat.id === activeCategory)
              ?.courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl 
                           transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{course.title}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{course.students}+ students</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">What you'll learn:</h4>
                      <ul className="space-y-2">
                        {course.outcomes.slice(0, 3).map((outcome, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-2xl font-bold text-indigo-600">{course.price}</span>
                      <Link to={`/course/${course.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white 
                                   rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};