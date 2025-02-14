import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Build Your{' '}
              <span className="block">
                Foundation As A{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-blue-400 text-transparent bg-clip-text">
                  Programmer
                </span>
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              CSE Fundamentals with Phitron
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Learn and Master Basic Programming, Data Structures, Algorithm, OOP, Database 
              and solve 500+ coding problems to become an exceptionally well world-class Programmer.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold
                         hover:bg-indigo-700 transition-colors"
              >
                Enroll Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-4 text-gray-700 inline-flex items-center space-x-2 text-lg
                         hover:text-indigo-600 transition-colors"
              >
                <Play className="w-6 h-6" />
                <span>Watch Video</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]">
              {/* Tech Icons */}
              <motion.img
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1740&q=80"
                alt="Programming Illustration"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-8 right-12 w-16 h-16 bg-blue-100 rounded-lg shadow-lg flex items-center justify-center"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-10 h-10" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 3.5 }}
                className="absolute top-1/4 -left-8 w-16 h-16 bg-indigo-100 rounded-lg shadow-lg flex items-center justify-center"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-10 h-10" />
              </motion.div>
              
              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute bottom-1/4 -right-8 w-16 h-16 bg-purple-100 rounded-lg shadow-lg flex items-center justify-center"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" className="w-10 h-10" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};