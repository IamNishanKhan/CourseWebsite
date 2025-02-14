import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Hero } from "../components/Hero";
import { CourseCard } from "../components/CourseCard";
import { EnrollmentCTA } from "../components/EnrollmentHome";
import { FAQ } from "../components/FAQ";

interface Course {
  course_id: number;
  category: number;
  instructor_name: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string | null;
  created_at: string;
}

export const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        const { data: coursesData } = await axios.get<Course[]>(
          "http://127.0.0.1:8000/api/courses/"
        );

        if (!isMounted) return;
        setFeaturedCourses(coursesData.slice(0, 6));
      } catch (err) {
        console.error("Error fetching courses:", err);
        if (isMounted) setError("Failed to load featured courses.");
      }
    };

    fetchCourses();
    return () => {
      isMounted = false;
    };
  }, []);

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
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={course.course_id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CourseCard {...course} />
                </motion.div>
              ))}
            </div>
        </div>
      </section>
      <EnrollmentCTA />
      <FAQ />
    </>
  );
};