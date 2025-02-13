import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { CourseCard } from '../components/CourseCard';
import { EnrollmentCTA } from '../components/EnrollmentCTA';
import { FAQ } from '../components/FAQ';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const courses = [
  {
    id: "web-development",
    title: "Web Development Masterclass",
    description: "Learn modern web development with React, Node.js, and more.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    duration: "12 weeks",
    students: 1500,
    rating: 4.8,
    price: "$99.99"
  },
  {
    id: "web-development",
    title: "Web Development Masterclass",
    description: "Learn modern web development with React, Node.js, and more.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    duration: "12 weeks",
    students: 1500,
    rating: 4.8,
    price: "$99.99"
  },
  {
    id: "web-development",
    title: "Web Development Masterclass",
    description: "Learn modern web development with React, Node.js, and more.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    duration: "12 weeks",
    students: 1500,
    rating: 4.8,
    price: "$99.99"
  },
  {
    id: "web-development",
    title: "Web Development Masterclass",
    description: "Learn modern web development with React, Node.js, and more.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    duration: "12 weeks",
    students: 1500,
    rating: 4.8,
    price: "$99.99"
  },
  // ... other courses
];

export const Home = () => {
  return (
    <>
      <Hero />
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our selection of premium courses
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <Link 
              to="/courses"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white 
                       bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              See More Courses
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
      <EnrollmentCTA />
      <FAQ />
    </>
  );
};