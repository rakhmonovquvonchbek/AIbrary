
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, User, Menu, X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'librarian' | null>(null);
  
  useEffect(() => {
    // Check if user is logged in by looking for userRole in localStorage
    const savedRole = localStorage.getItem('userRole');
    if (savedRole === 'student' || savedRole === 'librarian') {
      setUserRole(savedRole);
    } else {
      setUserRole(null);
    }
  }, []);

  const isLoggedIn = userRole !== null;
  const isLibrarian = userRole === 'librarian';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    // Clear user role from localStorage
    localStorage.removeItem('userRole');
    setUserRole(null);
    
    // Redirect to login page
    navigate('/login');
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Book className="h-6 w-6 text-library-primary" />
              <span className="ml-2 font-medium text-gray-800 text-lg">University Library</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/books" className="px-3 py-2 text-gray-700 hover:text-library-primary transition-colors">
              Books
            </Link>
            {isLoggedIn && (
              <Link to="/dashboard" className="px-3 py-2 text-gray-700 hover:text-library-primary transition-colors">
                Dashboard
              </Link>
            )}
            {isLibrarian && (
              <Link to="/admin" className="px-3 py-2 text-gray-700 hover:text-library-primary transition-colors">
                Admin
              </Link>
            )}
            
            <div className="ml-4 flex items-center">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium text-gray-700 flex items-center">
                    {isLibrarian ? (
                      <><Lock className="h-4 w-4 mr-1" /> Staff</>
                    ) : (
                      <><User className="h-4 w-4 mr-1" /> Student</>
                    )}
                  </div>
                  <Button 
                    variant="outline"
                    className="flex items-center space-x-2"
                    onClick={handleLogout}
                  >
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button 
                    variant="default"
                    className="bg-library-primary hover:bg-library-secondary transition-colors"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-library-primary hover:bg-gray-50 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-3 px-2 animate-slide-in">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/books"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-library-primary hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Books
            </Link>
            {isLoggedIn && (
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-library-primary hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {isLibrarian && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-library-primary hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            <div className="px-3 py-2">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 py-1 flex items-center">
                    {isLibrarian ? (
                      <><Lock className="h-4 w-4 mr-1" /> Staff Account</>
                    ) : (
                      <><User className="h-4 w-4 mr-1" /> Student Account</>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center space-x-2"
                    onClick={handleLogout}
                  >
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <Link to="/login" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    variant="default" 
                    className="w-full bg-library-primary hover:bg-library-secondary transition-colors"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
