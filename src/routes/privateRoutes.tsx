import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CourseProgress } from '../pages/CourseProgress';
import { Dashboard } from '../pages/Dashboard';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export const privateRoutes = [
  {
    path: 'course/:id/progress',
    element: <PrivateRoute><CourseProgress /></PrivateRoute>,
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
  },
];