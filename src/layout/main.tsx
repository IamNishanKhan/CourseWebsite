import { Outlet } from 'react-router-dom';
import { Navbar } from '../shared/Navbar';
import { Footer } from '../shared/Footer';


export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};