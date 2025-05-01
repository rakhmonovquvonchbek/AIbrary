
import React from 'react';
import { Link } from 'react-router-dom';
import { Book as BookIcon } from 'lucide-react';

export interface BookData {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  availableCopies: number;
  totalCopies: number;
  published: string;
  category: string;
}

interface BookCardProps {
  book: BookData;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const isAvailable = book.availableCopies > 0;

  return (
    <Link to={`/books/${book.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48 bg-gray-200">
          {book.coverImage ? (
            <img 
              src={book.coverImage} 
              alt={`${book.title} cover`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-library-accent/30">
              <BookIcon className="h-12 w-12 text-library-primary" />
            </div>
          )}
          <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded ${
            isAvailable ? 'bg-library-success text-white' : 'bg-library-error text-white'
          }`}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-2">{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{book.author}</p>
          <div className="mt-auto">
            <div className="text-xs text-gray-500 flex justify-between items-center">
              <span>{book.category}</span>
              <span>{book.published}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {book.availableCopies} of {book.totalCopies} available
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
