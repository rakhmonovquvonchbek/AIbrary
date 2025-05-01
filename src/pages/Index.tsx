
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Search, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';

const Index: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-library-primary/20 to-library-accent/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            University Library Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Access thousands of books, journals, and academic resources to support your studies and research.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/books">
              <Button size="lg" className="bg-library-primary hover:bg-library-secondary">
                <Search className="mr-2 h-4 w-4" />
                Browse Books
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-card flex flex-col items-center text-center">
              <div className="bg-library-primary/10 p-4 rounded-full mb-4">
                <Book className="h-8 w-8 text-library-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Extensive Collection</h3>
              <p className="text-gray-600">
                Access thousands of books, journals, and digital resources across all academic disciplines.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-card flex flex-col items-center text-center">
              <div className="bg-library-primary/10 p-4 rounded-full mb-4">
                <Clock className="h-8 w-8 text-library-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Reservations</h3>
              <p className="text-gray-600">
                Reserve books online and receive notifications when they're ready for pickup.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-card flex flex-col items-center text-center">
              <div className="bg-library-primary/10 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-library-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Powerful Search</h3>
              <p className="text-gray-600">
                Find exactly what you need with our advanced search and filtering options.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-library-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Sign in with your university credentials to access all features, borrow books, and manage your account.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="bg-white text-library-dark hover:bg-gray-100">
              Sign In Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Books Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recently Added Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: 'Introduction to Algorithms',
                coverImage: 'https://source.unsplash.com/random/300x400/?book,algorithm'
              },
              {
                title: 'Clean Code',
                coverImage: 'https://source.unsplash.com/random/300x400/?book,code'
              },
              {
                title: 'Design Patterns',
                coverImage: 'https://source.unsplash.com/random/300x400/?book,design'
              },
              {
                title: 'Artificial Intelligence',
                coverImage: 'https://source.unsplash.com/random/300x400/?book,ai'
              }
            ].map((book, index) => (
              <div key={index} className="bg-white rounded-lg shadow-card overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{book.title}</h3>
                  <Link to="/books">
                    <Button variant="ghost" size="sm" className="w-full text-library-primary">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/books">
              <Button variant="outline">Browse All Books</Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
