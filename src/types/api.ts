// Auth Types
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

// Category Types
export interface Category {
  category_id: number;
  category_name: string;
  created_at: string;
}

// Course Types
export interface Course {
  course_id: number;
  title: string;
  description: string;
  price: string;
  thumbnail: string | null;
  created_at: string;
  updated_at: string;
  category: number;
  user: number;
}

// Enrollment Types
export interface Enrollment {
  enrollment_id: number;
  enrolled_at: string;
  user: number;
  course: number;
}

// Module Types
export interface Module {
  module_id: number;
  title: string;
  order: number;
  course_id: number;
  course_name: string;
  created_at: string;
  updated_at: string;
}

// Lesson Types
export interface Lesson {
  lesson_id: number;
  title: string;
  video_url: string;
  duration: number;
  order: number;
  created_at: string;
  updated_at: string;
  module: number;
}