import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layout/main';
import { PrivateRoutes } from './PrivateRoutes';
import { NotFound } from '../shared/NotFound';
import {
  Home,
  Login,
  Signup,
  Courses,
  CourseDetails,
  CourseProgress,
  Dashboard
} from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'courses',
        element: <Courses />
      },
      {
        path: 'course/:id',
        element: <CourseDetails />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: 'course/:id/progress',
            element: <CourseProgress />
          }
        ]
      }
    ]
  }
]);