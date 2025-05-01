import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BookCard, { BookData } from '@/components/ui/BookCard';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Book } from 'lucide-react';

// Mock book data
const mockBooks: BookData[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    coverImage: 'https://source.unsplash.com/random/300x400/?book,algorithm',
    availableCopies: 3,
    totalCopies: 5,
    published: '2009',
    category: 'Computer Science'
  },
  {
    id: '2',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    coverImage: 'https://source.unsplash.com/random/300x400/?book,code',
    availableCopies: 0,
    totalCopies: 3,
    published: '2008',
    category: 'Software Development'
  },
  {
    id: '3',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma',
    coverImage: 'https://source.unsplash.com/random/300x400/?book,design',
    availableCopies: 2,
    totalCopies: 4,
    published: '1994',
    category: 'Software Development'
  },
  {
    id: '4',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    coverImage: 'https://source.unsplash.com/random/300x400/?book,programming',
    availableCopies: 1,
    totalCopies: 2,
    published: '1999',
    category: 'Software Development'
  },
  {
    id: '5',
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell',
    coverImage: 'https://source.unsplash.com/random/300x400/?book,ai',
    availableCopies: 4,
    totalCopies: 6,
    published: '2020',
    category: 'Computer Science'
  },
  {
    id: '6',
    title: 'Database Systems: The Complete Book',
    author: 'Hector Garcia-Molina',
    coverImage: 'https://source.unsplash.com/random/300x400/?book,database',
    availableCopies: 0,
    totalCopies: 4,
    published: '2008',
    category: 'Computer Science'
  },
];

// Filter options
const categories = ['Computer Science', 'Software Development', 'Mathematics', 'Physics', 'Literature', 'History'];
const availabilityOptions = ['All Books', 'Available Now', 'Currently Unavailable'];
const sortOptions = ['Relevance', 'Title (A-Z)', 'Title (Z-A)', 'Newest First', 'Oldest First'];

const BookSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All Books');
  const [sortBy, setSortBy] = useState<string>('Relevance');
  const [books, setBooks] = useState<BookData[]>(mockBooks);
  const [isSearching, setIsSearching] = useState(false);

  // Filter books based on search criteria
  const handleSearch = () => {
    setIsSearching(true);
    
    // In a real app, this would call an API with filters
    setTimeout(() => {
      let filteredBooks = [...mockBooks];
      
      // Filter by search query
      if (searchQuery) {
        filteredBooks = filteredBooks.filter(book => 
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Filter by categories
      if (selectedCategories.length > 0) {
        filteredBooks = filteredBooks.filter(book => 
          selectedCategories.includes(book.category)
        );
      }
      
      // Filter by availability
      if (selectedAvailability === 'Available Now') {
        filteredBooks = filteredBooks.filter(book => book.availableCopies > 0);
      } else if (selectedAvailability === 'Currently Unavailable') {
        filteredBooks = filteredBooks.filter(book => book.availableCopies === 0);
      }
      
      // Sort books
      if (sortBy === 'Title (A-Z)') {
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === 'Title (Z-A)') {
        filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
      } else if (sortBy === 'Newest First') {
        filteredBooks.sort((a, b) => parseInt(b.published) - parseInt(a.published));
      } else if (sortBy === 'Oldest First') {
        filteredBooks.sort((a, b) => parseInt(a.published) - parseInt(b.published));
      }
      
      setBooks(filteredBooks);
      setIsSearching(false);
    }, 500);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedAvailability('All Books');
    setSortBy('Relevance');
    setSearchQuery('');
    setBooks(mockBooks);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </div>
        
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {selectedCategories.length > 0 && (
                  <Badge className="ml-2 bg-library-primary">{selectedCategories.length}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filter Books</SheetTitle>
                <SheetDescription>
                  Narrow down your search with these filters.
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category}`} 
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                        />
                        <Label htmlFor={`category-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Availability</h3>
                  <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      {availabilityOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <SheetFooter>
                <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
                  <X className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
                <Button onClick={() => handleSearch()} className="w-full sm:w-auto bg-library-primary hover:bg-library-secondary">
                  Apply Filters
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button onClick={handleSearch} className="bg-library-primary hover:bg-library-secondary">
            Search
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || selectedAvailability !== 'All Books' || sortBy !== 'Relevance') && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>
          
          {selectedCategories.map(category => (
            <Badge key={category} variant="outline" className="flex items-center gap-1">
              {category}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleCategoryToggle(category)}
              />
            </Badge>
          ))}
          
          {selectedAvailability !== 'All Books' && (
            <Badge variant="outline" className="flex items-center gap-1">
              {selectedAvailability}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSelectedAvailability('All Books')}
              />
            </Badge>
          )}
          
          {sortBy !== 'Relevance' && (
            <Badge variant="outline" className="flex items-center gap-1">
              Sort: {sortBy}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSortBy('Relevance')}
              />
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm text-gray-500 hover:text-library-primary"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Search Results */}
      {isSearching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg h-80"></div>
          ))}
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Book className="h-12 w-12" />
          <h2 className="mt-4 text-xl font-medium text-gray-900">No books found</h2>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <Button onClick={clearFilters} className="mt-4">
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
