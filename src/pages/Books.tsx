
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import BookSearch from '@/components/books/BookSearch';
import BookDetails, { BookDetailsProps } from '@/components/books/BookDetails';
import { useParams, useNavigate } from 'react-router-dom';

// Mock detailed book data
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

const Books: React.FC = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [selectedBook, setSelectedBook] = useState<BookDetailsProps | null>(
    bookId ? mockBookDetails : null
  );

  // In a real app, this would come from an authentication context
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

  const handleBackToSearch = () => {
    setSelectedBook(null);
    navigate('/books');
  };

  const handleBookUpdate = (updatedBook: BookDetailsProps) => {
    setSelectedBook(updatedBook);
    // In a real app, this would call an API to update the book
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {selectedBook ? 'Book Details' : 'Library Collection'}
          </h1>
          
          {/* Demo toggle - this would not exist in a real app */}
          <button 
            onClick={toggleRole} 
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded"
          >
            Switch to {userRole === 'student' ? 'Librarian' : 'Student'} View (Demo)
          </button>
        </div>
        
        {selectedBook ? (
          <BookDetails 
            book={selectedBook} 
            onBack={handleBackToSearch} 
            isLibrarian={userRole === 'librarian'}
            onBookUpdate={handleBookUpdate}
          />
        ) : (
          <BookSearch />
        )}
      </div>
    </MainLayout>
  );
};

export default Books;
