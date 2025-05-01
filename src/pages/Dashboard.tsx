
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import LibrarianDashboard from '@/components/dashboard/LibrarianDashboard';

const Dashboard: React.FC = () => {
  // In a real app, this would come from an authentication context
  // This is just for demo purposes
  const [userRole, setUserRole] = useState<'student' | 'librarian'>('student');
  
  const toggleRole = () => {
    setUserRole(prev => prev === 'student' ? 'librarian' : 'student');
  };

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Demo toggle - this would not exist in a real app */}
        <div className="mb-6 flex justify-end">
          <button 
            onClick={toggleRole} 
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded"
          >
            Switch to {userRole === 'student' ? 'Librarian' : 'Student'} View (Demo)
          </button>
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
