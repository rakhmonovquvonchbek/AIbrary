
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import LibrarianDashboard from '@/components/dashboard/LibrarianDashboard';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'student' | 'librarian' | null>(null);
  
  useEffect(() => {
    // Get user role from localStorage
    const savedRole = localStorage.getItem('userRole');
    
    if (savedRole === 'student' || savedRole === 'librarian') {
      setUserRole(savedRole);
    } else {
      // If no valid role is found, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  if (!userRole) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {userRole === 'librarian' ? 'Library Staff Dashboard' : 'Student Dashboard'}
          </h1>
        </div>
        
        {userRole === 'student' ? (
          <StudentDashboard />
        ) : (
          <LibrarianDashboard />
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
