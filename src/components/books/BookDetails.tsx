
import React, { useState } from 'react';
import { Book as BookIcon, ChevronLeft, Calendar, User, FileText, Clock, List, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import BookEditDialog from './BookEditDialog';

export interface BookDetailsProps {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  availableCopies: number;
  totalCopies: number;
  published: string;
  publisher: string;
  category: string;
  isbn: string;
  description: string;
  pageCount: number;
  language: string;
  subjects: string[];
  relatedBooks?: {
    id: string;
    title: string;
    author: string;
    coverImage?: string;
  }[];
}

interface BookDetailsComponentProps {
  book: BookDetailsProps;
  onBack: () => void;
  isLibrarian?: boolean;  // New prop to determine if user is a librarian
  onBookUpdate?: (updatedBook: BookDetailsProps) => void;  // New prop for handling updates
}

const BookDetails: React.FC<BookDetailsComponentProps> = ({ 
  book, 
  onBack, 
  isLibrarian = false,  // Default to student view
  onBookUpdate
}) => {
  const [isReserving, setIsReserving] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookDetailsProps>(book);
  const { toast } = useToast();
  const isAvailable = currentBook.availableCopies > 0;

  const handleReserve = () => {
    setIsReserving(true);
    
    // In a real app, this would call an API
    setTimeout(() => {
      toast({
        title: "Book Reserved",
        description: `You've successfully reserved "${currentBook.title}". Please pick it up within 24 hours.`,
      });
      setIsReserving(false);
    }, 1500);
  };

  const handleBookUpdate = (updatedBook: BookDetailsProps) => {
    setCurrentBook(updatedBook);
    if (onBookUpdate) {
      onBookUpdate(updatedBook);
    }
  };

  return (
    <div className="animate-fade-in">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-4 text-gray-600 hover:text-library-primary"
        onClick={onBack}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Books
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Book Cover and Basic Info */}
        <div>
          <div className="bg-white rounded-lg overflow-hidden shadow-card mb-4">
            {currentBook.coverImage ? (
              <img 
                src={currentBook.coverImage} 
                alt={`${currentBook.title} cover`}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full h-72 flex items-center justify-center bg-library-accent/30">
                <BookIcon className="h-16 w-16 text-library-primary" />
              </div>
            )}
          </div>

          <Card className="p-4">
            <h2 className="sr-only">Book Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Status:</span>
                <Badge className={isAvailable ? "bg-library-success" : "bg-library-error"}>
                  {isAvailable ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Copies:</span>
                <span className="font-medium">{currentBook.availableCopies} of {currentBook.totalCopies} available</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">ISBN:</span>
                <span className="font-medium">{currentBook.isbn}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Language:</span>
                <span className="font-medium">{currentBook.language}</span>
              </div>
              <div className="pt-3 border-t border-gray-100">
                {isLibrarian ? (
                  <Button 
                    className="w-full bg-library-primary hover:bg-library-secondary"
                    onClick={() => setEditDialogOpen(true)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Book Information
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-library-primary hover:bg-library-secondary"
                    disabled={!isAvailable || isReserving}
                    onClick={handleReserve}
                  >
                    {isReserving ? "Processing..." : isAvailable ? "Reserve Book" : "Join Waitlist"}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Book Details */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentBook.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {currentBook.author}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {currentBook.subjects.map((subject, index) => (
                <Badge key={index} variant="secondary" className="bg-library-accent/20 hover:bg-library-accent/30">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="related">Related Books</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-4 pt-4">
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </TabsContent>
            
            <TabsContent value="details" className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-library-primary" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">Publication Date</h3>
                    <p className="text-sm text-gray-600">{book.published}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-library-primary" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">Publisher</h3>
                    <p className="text-sm text-gray-600">{book.publisher}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-library-primary" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">Page Count</h3>
                    <p className="text-sm text-gray-600">{book.pageCount} pages</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <List className="h-5 w-5 text-library-primary" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">Category</h3>
                    <p className="text-sm text-gray-600">{book.category}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 col-span-full">
                  <Clock className="h-5 w-5 text-library-primary" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">Average Time to Read</h3>
                    <p className="text-sm text-gray-600">Approximately {Math.ceil(book.pageCount / 30)} hours</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="related" className="pt-4">
              {book.relatedBooks && book.relatedBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {book.relatedBooks.map(relatedBook => (
                    <div key={relatedBook.id} className="bg-white rounded-md shadow p-3 flex items-center space-x-3">
                      <div className="h-16 w-12 flex-shrink-0">
                        {relatedBook.coverImage ? (
                          <img 
                            src={relatedBook.coverImage} 
                            alt={relatedBook.title} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <BookIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{relatedBook.title}</h4>
                        <p className="text-xs text-gray-500">{relatedBook.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No related books found.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Book Edit Dialog - Only rendered for librarians */}
      {isLibrarian && (
        <BookEditDialog 
          book={currentBook}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSave={handleBookUpdate}
        />
      )}
    </div>
  );
};

export default BookDetails;
