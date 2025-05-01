
import React from 'react';
import { Book } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import MainLayout from '@/components/layout/MainLayout';

const Login: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-indigo-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-indigo-100 p-3">
                <Book className="h-12 w-12 text-indigo-600" />
              </div>
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              University Library
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Sign in or create an account to access the library system
            </p>
          </div>
          <div className="mt-8 bg-white py-8 px-4 shadow-lg rounded-lg border border-indigo-100 sm:px-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
