import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export const EnrollmentCTA = () => {
  return (
    <div className="bg-indigo-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Rocket className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already transformed their careers
            through our expert-led courses.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold
                     hover:bg-indigo-700 transition-colors"
          >
            Enroll Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};