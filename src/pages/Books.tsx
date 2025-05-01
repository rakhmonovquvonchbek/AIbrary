
import React, { useState } from 'react';
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

  const handleBackToSearch = () => {
    setSelectedBook(null);
    navigate('/books');
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {selectedBook ? 'Book Details' : 'Library Collection'}
        </h1>
        
        {selectedBook ? (
          <BookDetails book={selectedBook} onBack={handleBackToSearch} />
        ) : (
          <BookSearch />
        )}
      </div>
    </MainLayout>
  );
};

export default Books;
