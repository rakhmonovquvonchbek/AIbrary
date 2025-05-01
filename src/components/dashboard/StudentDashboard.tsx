
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Clock, CalendarCheck, Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data for the dashboard
const borrowedBooks = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    coverImage: 'https://source.unsplash.com/random/300x400/?book,algorithm',
    dueDate: '2025-05-15',
    isOverdue: false,
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    coverImage: 'https://source.unsplash.com/random/300x400/?book,code',
    dueDate: '2025-05-03',
    isOverdue: true,
  },
  {
    id: '3',
    title: 'Design Patterns',
    author: 'Erich Gamma',
    coverImage: 'https://source.unsplash.com/random/300x400/?book,design',
    dueDate: '2025-05-20',
    isOverdue: false,
  }
];

const notifications = [
  {
    id: '1',
    message: 'Your book "Clean Code" is overdue',
    timestamp: '2025-05-01',
    type: 'overdue'
  },
  {
    id: '2',
    message: '"Introduction to Algorithms" is due in 2 days',
    timestamp: '2025-05-01',
    type: 'reminder'
  },
  {
    id: '3',
    message: 'Your book request for "Machine Learning" has been approved',
    timestamp: '2025-04-28',
    type: 'approval'
  }
];

const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Dashboard</h2>
        <Link to="/books">
          <Button variant="outline">Browse Books</Button>
        </Link>
      </div>

      {/* Currently Borrowed Books */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <Book className="mr-2 h-5 w-5 text-library-primary" />
          Currently Borrowed Books
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {borrowedBooks.map(book => (
            <Card key={book.id} className={`overflow-hidden ${book.isOverdue ? 'border-library-error border-2' : ''}`}>
              <div className="h-40 w-full overflow-hidden">
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{book.title}</CardTitle>
                <CardDescription>{book.author}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className={`flex items-center ${book.isOverdue ? 'text-library-error' : 'text-gray-600'}`}>
                  <Clock className="mr-2 h-4 w-4" />
                  <span className="text-sm">
                    {book.isOverdue 
                      ? `Overdue since ${book.dueDate}` 
                      : `Due on ${book.dueDate}`}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button size="sm" variant={book.isOverdue ? "destructive" : "outline"}>
                  {book.isOverdue ? 'Renew Now' : 'Return Book'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Reading History & Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reading History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CalendarCheck className="mr-2 h-5 w-5 text-library-primary" />
              Reading History
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Books borrowed this semester</p>
                  <p className="text-3xl font-bold text-library-primary">8</p>
                </div>
                <div>
                  <p className="font-medium">On-time returns</p>
                  <p className="text-3xl font-bold text-library-success">7</p>
                </div>
                <div>
                  <p className="font-medium">Overdue returns</p>
                  <p className="text-3xl font-bold text-library-error">1</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="text-library-primary">View Complete History</Button>
          </CardFooter>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Bell className="mr-2 h-5 w-5 text-library-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map(notification => (
                <div key={notification.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                  <div className={`p-1.5 rounded-full ${
                    notification.type === 'overdue' ? 'bg-library-error' : 
                    notification.type === 'reminder' ? 'bg-library-warning' : 
                    'bg-library-success'
                  }`}>
                    {notification.type === 'overdue' ? (
                      <Clock className="h-4 w-4 text-white" />
                    ) : notification.type === 'reminder' ? (
                      <Bell className="h-4 w-4 text-white" />
                    ) : (
                      <CalendarCheck className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="text-library-primary">View All Notifications</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
