import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-left space-y-6">
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
                onClick={() => navigate("/courses")}
                aria-label="Start learning AI & Data Science"
              >
                Start Learning
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="relative h-full">
            <div className="relative w-full h-full">
              <motion.img initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1740&q=80" alt="AI and Deep Learning Illustration" className="w-full h-full object-cover rounded-2xl shadow-2xl" />

              {/* Floating Tech Logos */}
              {[
                { src: "https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg", alt: "TensorFlow", top: "-top-8", right: "right-12" },
                { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/PyTorch_logo_icon.svg/496px-PyTorch_logo_icon.svg.png?20200318225611", alt: "PyTorch", top: "top-1/4", left: "-left-8" },
                { src: "https://cdn.worldvectorlogo.com/logos/python-5.svg", alt: "Python", bottom: "bottom-1/4", right: "-right-8" },
                { src: "https://cdn.worldvectorlogo.com/logos/matlab.svg", alt: "MATLAB", top: "top-2/3", left: "left-4" },
              ].map((logo, index) => (
                <motion.div key={index} animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3 + index * 0.5, ease: "easeInOut" }} className={`absolute ${logo.top || ""} ${logo.bottom || ""} ${logo.left || ""} ${logo.right || ""} w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center p-2`}>
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
