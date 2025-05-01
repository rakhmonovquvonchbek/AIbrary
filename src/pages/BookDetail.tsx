
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import BookDetails, { BookDetailsProps } from '@/components/books/BookDetails';

// Mock detailed book data - in a real app this would come from an API
const mockBookDetails: BookDetailsProps = {
  id: '1',
  title: 'Introduction to Algorithms',
  author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
  coverImage: 'https://source.unsplash.com/random/300x500/?book,algorithm',
  availableCopies: 3,
  totalCopies: 5,
  published: 'September 2009',
  publisher: 'MIT Press',
  category: 'Computer Science',
  isbn: '978-0262033848',
  description: 'This internationally acclaimed textbook provides a comprehensive introduction to the modern study of computer algorithms. It covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively self-contained and presents an algorithm, a design technique, an application area, or a related topic. The algorithms are described and designed in a manner to be readable by anyone who has done a little programming. The explanations have been kept elementary without sacrificing depth of coverage or mathematical rigor.',
  pageCount: 1312,
  language: 'English',
  subjects: ['Computer Science', 'Algorithms', 'Data Structures', 'Programming'],
  relatedBooks: [
    {
      id: '3',
      title: 'Design Patterns',
      author: 'Erich Gamma',
      coverImage: 'https://source.unsplash.com/random/300x400/?book,design',
    },
    {
      id: '4',
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      coverImage: 'https://source.unsplash.com/random/300x400/?book,programming',
    },
    {
      id: '5',
      title: 'Artificial Intelligence: A Modern Approach',
      author: 'Stuart Russell',
      coverImage: 'https://source.unsplash.com/random/300x400/?book,ai',
    },
  ],
};

const BookDetail: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookDetailsProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // In a real app, this would come from an authentication context
  // For demo purposes, we can use the same toggle from Dashboard.tsx
  const [userRole, setUserRole] = useState<'student' | 'librarian'>(() => {
    // Try to get the role from localStorage to persist it between page navigations
    const savedRole = localStorage.getItem('userRole');
    return (savedRole === 'librarian' ? 'librarian' : 'student');
  });

  const toggleRole = () => {
    const newRole = userRole === 'student' ? 'librarian' : 'student';
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  useEffect(() => {
    // In a real app, this would be an API call to fetch book details by ID
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Here we're just using mock data, but in a real app, you'd fetch the book by ID
      setBook(mockBookDetails);
      setIsLoading(false);
    }, 500);
  }, [bookId]);

  const handleBack = () => {
    navigate('/books');
  };

  const handleBookUpdate = (updatedBook: BookDetailsProps) => {
    setBook(updatedBook);
    // In a real app, this would call an API to update the book in the database
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-200 mb-6 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="md:col-span-2 space-y-4">
                <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded mt-6"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!book) {
    return (
      <MainLayout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Not Found</h1>
          <p className="text-gray-600 mb-4">
            Sorry, we couldn't find the book you're looking for.
          </p>
          <button 
            onClick={handleBack}
            className="text-library-primary hover:underline"
          >
            Go back to book search
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Book Details</h1>
          
          {/* Demo toggle - this would not exist in a real app */}
          <button 
            onClick={toggleRole} 
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded"
          >
            Switch to {userRole === 'student' ? 'Librarian' : 'Student'} View (Demo)
          </button>
        </div>
        
        <BookDetails 
          book={book} 
          onBack={handleBack} 
          isLibrarian={userRole === 'librarian'}
          onBookUpdate={handleBookUpdate}
        />
      </div>
    </MainLayout>
  );
};

export default BookDetail;
