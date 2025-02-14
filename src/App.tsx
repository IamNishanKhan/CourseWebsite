import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CourseCard } from "./components/CourseCard";
import { EnrollmentCTA } from "./components/EnrollmentCTA";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { CourseDetails } from "./pages/CourseDetails";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Courses } from "./pages/Courses";
import { CourseProgress } from "./pages/CourseProgress";

interface Course {
  course_id: number;
  category: number;
  instructor_name: string; // Directly from API
  title: string;
  description: string;
  price: string;
  thumbnail: string | null;
  created_at: string;
}

function App() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        const { data: coursesData } = await axios.get<Course[]>(
          "http://127.0.0.1:8000/api/courses/"
        );

        if (!isMounted) return;

        console.log("Fetched Courses:", coursesData);

        // Use courses directly without extra user API call
        setFeaturedCourses(coursesData.slice(0, 6)); // Select top 6 courses
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load featured courses.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Router>
      <AnimatePresence>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  {/* Featured Courses Section */}
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

                      {/* Loading & Error Handling */}
                      {loading ? (
                        <p className="text-center text-gray-600">Loading featured courses...</p>
                      ) : error ? (
                        <p className="text-center text-red-600">{error}</p>
                      ) : (
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
                      )}
                    </div>
                  </section>

                  <EnrollmentCTA />
                  <FAQ />
                  <Footer />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/course/:id/progress" element={<CourseProgress />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </AnimatePresence>
    </Router>
  );
}

export default App;
