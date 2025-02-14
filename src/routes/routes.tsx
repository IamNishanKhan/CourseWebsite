import { Navigate } from 'react-router-dom';
import { MainLayout } from '../layout/main';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { Courses } from '../pages/Courses';
import { CourseDetails } from '../pages/CourseDetails';
import { privateRoutes } from './privateRoutes';
import { ForgotPassword } from '../pages/ForgotPassword';

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'course/:id',
        element: <CourseDetails />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      ...privateRoutes,
    ],
  },
];