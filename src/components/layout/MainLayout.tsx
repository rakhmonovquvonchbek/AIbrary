
import React from 'react';
import Navbar from '../navigation/Navbar';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && <Navbar />}
      <main className={`${!isLoginPage ? 'pt-16' : ''} animate-fade-in`}>
        {children}
      </main>
      {!isLoginPage && (
        <footer className="py-6 bg-white border-t">
          <div className="container text-center text-sm text-gray-500">
            © {new Date().getFullYear()} University Library Management System
          </div>
        </footer>
      )}
    </div>
  );
};

export default MainLayout;
