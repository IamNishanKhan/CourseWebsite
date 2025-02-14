import React from "react";
import { motion } from "framer-motion";
import { Play, Brain, Database, Network } from "lucide-react";

export const Hero = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
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
              Master The Future of{" "}
              <span className="block">
                <span className="bg-gradient-to-r from-indigo-600 to-blue-400 text-transparent bg-clip-text">AI & Data Science</span>
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Deep Learning • Machine Learning • Data Science</h2>
            <p className="text-lg text-gray-600 max-w-xl">Dive into the world of AI with comprehensive courses in Deep Learning, Machine Learning, and Data Science. Master neural networks, computer vision, NLP, and data analytics to become an AI expert.</p>
            <div className="flex flex-wrap gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold
                         hover:bg-indigo-700 transition-colors"
              >
                Start Learning
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-full"
          >
            <div className="relative w-full h-full">
              <motion.img
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1740&q=80"
                alt="AI and Deep Learning Illustration"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              
              {/* Floating Tech Logos */}
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -top-8 right-12 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center p-2">
                <img src="https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg" alt="TensorFlow" className="w-full h-full object-contain" />
              </motion.div>

              <motion.div animate={{ y: [-80, -70, -80] }} transition={{ repeat: Infinity, duration: 3.5 }} className="absolute top-1/4 -left-8 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center p-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/PyTorch_logo_icon.svg/496px-PyTorch_logo_icon.svg.png?20200318225611" alt="PyTorch" className="w-full h-full object-contain" />
              </motion.div>

              <motion.div animate={{ y: [80, 90, 80] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute bottom-1/4 -right-8 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center p-2">
                <img src="https://cdn.worldvectorlogo.com/logos/python-5.svg" alt="Python" className="w-full h-full object-contain" />
              </motion.div>

              <motion.div animate={{ y: [120, 130, 120] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-2/3 left-4 w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center p-2">
                <img src="https://cdn.worldvectorlogo.com/logos/matlab.svg" alt="MATLAB" className="w-full h-full object-contain" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
