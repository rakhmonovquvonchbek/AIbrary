
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Clock, User, Database, ChartBar, Archive, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for the dashboard
const overdueBooks = [
  {
    id: '1',
    title: 'Clean Code',
    student: 'Alex Johnson',
    studentId: 'SID12345',
    dueDate: '2025-04-25',
    daysOverdue: 6,
  },
  {
    id: '2',
    title: 'JavaScript: The Good Parts',
    student: 'Emma Smith',
    studentId: 'SID67890',
    dueDate: '2025-04-28',
    daysOverdue: 3,
  },
  {
    id: '3',
    title: 'Design Patterns',
    student: 'Michael Brown',
    studentId: 'SID24680',
    dueDate: '2025-04-30',
    daysOverdue: 1,
  },
];

const recentActivities = [
  {
    id: '1',
    action: 'Book Return',
    book: 'Introduction to Economics',
    student: 'Sarah Williams',
    timestamp: '2025-05-01 14:30',
  },
  {
    id: '2',
    action: 'Book Checkout',
    book: 'World History Volume II',
    student: 'David Garcia',
    timestamp: '2025-05-01 13:15',
  },
  {
    id: '3',
    action: 'Fine Payment',
    book: 'Programming in Python',
    student: 'Lisa Chen',
    amount: '$5.50',
    timestamp: '2025-05-01 11:20',
  },
  {
    id: '4',
    action: 'New Book Added',
    book: 'Artificial Intelligence: A Modern Approach',
    admin: 'Admin User',
    timestamp: '2025-05-01 09:45',
  },
];

const LibrarianDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Librarian Dashboard</h2>
        <div className="flex space-x-2">
          <Button className="bg-library-primary hover:bg-library-secondary" size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Book
          </Button>
          <Button variant="outline" size="sm">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Books</CardDescription>
            <CardTitle className="text-3xl">4,328</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>2,546 available</span>
              <span>1,782 borrowed</span>
            </div>
            <Progress className="mt-2" value={58} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Students</CardDescription>
            <CardTitle className="text-3xl">1,245</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-xs text-muted-foreground">
              <p>362 with active loans</p>
              <p>28 with overdue items</p>
            </div>
            <User className="h-8 w-8 text-library-primary opacity-70" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Books Due Today</CardDescription>
            <CardTitle className="text-3xl">42</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-xs text-muted-foreground">
              <p>15 already returned</p>
              <p>27 still out</p>
            </div>
            <Clock className="h-8 w-8 text-library-warning opacity-70" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Overdue Books</CardDescription>
            <CardTitle className="text-3xl">78</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-xs text-muted-foreground">
              <p>32 overdue by &gt; 7 days</p>
              <p>12 fines collected</p>
            </div>
            <Archive className="h-8 w-8 text-library-error opacity-70" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Different Dashboard Views */}
      <Tabs defaultValue="overdue" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-4 mb-4 w-full">
          <TabsTrigger value="overdue">Overdue Books</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="popular">Popular Books</TabsTrigger>
          <TabsTrigger value="inventory" className="hidden md:block">Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overdue" className="border rounded-md p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Overdue Books</h3>
            <Button variant="ghost" size="sm" className="text-library-primary">Send Reminders</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {overdueBooks.map((book) => (
                  <tr key={book.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.student} <span className="text-xs text-gray-400">({book.studentId})</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        book.daysOverdue > 5 ? 'bg-red-100 text-red-800' : 
                        book.daysOverdue > 2 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {book.daysOverdue} days
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button variant="ghost" size="sm" className="text-library-primary">Send Reminder</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="border rounded-md p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="text-library-primary">View All Activity</Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                <div className={`p-1.5 rounded-full ${
                  activity.action === 'Book Return' ? 'bg-green-100' : 
                  activity.action === 'Book Checkout' ? 'bg-blue-100' : 
                  activity.action === 'Fine Payment' ? 'bg-yellow-100' : 
                  'bg-purple-100'
                }`}>
                  {activity.action === 'Book Return' ? (
                    <Archive className="h-4 w-4 text-green-600" />
                  ) : activity.action === 'Book Checkout' ? (
                    <Book className="h-4 w-4 text-blue-600" />
                  ) : activity.action === 'Fine Payment' ? (
                    <Clock className="h-4 w-4 text-yellow-600" />
                  ) : (
                    <Plus className="h-4 w-4 text-purple-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}: {activity.book}</p>
                  <p className="text-xs text-gray-500">
                    {activity.student ? `Student: ${activity.student}` : activity.admin ? `Staff: ${activity.admin}` : ''}
                    {activity.amount ? ` • Amount: ${activity.amount}` : ''}
                  </p>
                  <p className="text-xs text-gray-400">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="popular" className="border rounded-md p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Popular Books This Month</h3>
            <Button variant="ghost" size="sm" className="text-library-primary">View Full Report</Button>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ChartBar className="h-16 w-16 text-gray-300" />
            <p className="ml-4 text-gray-500">Analytics visualization would appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory" className="border rounded-md p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Inventory Status</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Export CSV</Button>
              <Button variant="outline" size="sm">Print Report</Button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <Database className="h-16 w-16 text-gray-300" />
            <p className="ml-4 text-gray-500">Inventory management table would appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LibrarianDashboard;
