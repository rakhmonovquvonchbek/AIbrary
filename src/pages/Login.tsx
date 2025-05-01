
import React from 'react';
import { Book } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import MainLayout from '@/components/layout/MainLayout';

const Login: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Book className="h-12 w-12 text-library-primary" />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              University Library
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Sign in or create an account to access the library system
            </p>
          </div>
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
