
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Lock, User } from 'lucide-react';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'student' | 'librarian'>('student');
  
  const [loginData, setLoginData] = useState({
    studentId: '',
    password: '',
  });

  const [librarianLoginData, setLibrarianLoginData] = useState({
    staffId: '',
    password: '',
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLibrarianLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLibrarianLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be an API call
      console.log('Student logging in with:', loginData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user role in localStorage
      localStorage.setItem('userRole', 'student');
      
      // Simulating successful login
      toast({
        title: "Login successful!",
        description: "Welcome to the University Library system.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLibrarianLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be an API call with proper verification
      console.log('Librarian logging in with:', librarianLoginData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would check credentials against librarian accounts only
      // For demo, let's assume the staffId must start with "LIB" to be a valid librarian
      if (!librarianLoginData.staffId.startsWith("LIB")) {
        throw new Error("Invalid librarian credentials");
      }
      
      // Store user role in localStorage
      localStorage.setItem('userRole', 'librarian');
      
      // Simulating successful login
      toast({
        title: "Librarian login successful!",
        description: "Welcome to the Library Management System.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your librarian credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [registerData, setRegisterData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // In a real app, this would be an API call
      console.log('Registering with:', registerData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Registration successful!",
        description: "Your student account has been created. Please log in.",
      });
      
      // Switch to login tab after successful registration
      setActiveTab('student');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was a problem creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as 'student' | 'librarian')} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="student" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Student
          </TabsTrigger>
          <TabsTrigger value="librarian" className="flex items-center gap-2">
            <Lock className="h-4 w-4" /> Librarian
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="student">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    name="studentId"
                    placeholder="Enter your student ID"
                    value={loginData.studentId}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-library-secondary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-library-primary hover:bg-library-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={registerData.fullName}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="studentIdRegister">Student ID</Label>
                  <Input
                    id="studentIdRegister"
                    name="studentId"
                    placeholder="Enter your student ID"
                    value={registerData.studentId}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passwordRegister">Password</Label>
                  <Input
                    id="passwordRegister"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-library-primary hover:bg-library-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="librarian">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded mb-4">
            <h3 className="font-medium text-gray-700 mb-1">Staff Access Only</h3>
            <p className="text-sm text-gray-600">This login is restricted to authorized library staff members.</p>
          </div>
          
          <form onSubmit={handleLibrarianLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="staffId">Staff ID</Label>
              <Input
                id="staffId"
                name="staffId"
                placeholder="Enter your staff ID"
                value={librarianLoginData.staffId}
                onChange={handleLibrarianLoginChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="librarianPassword">Password</Label>
                <a href="#" className="text-sm text-library-secondary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="librarianPassword"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={librarianLoginData.password}
                onChange={handleLibrarianLoginChange}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-library-primary hover:bg-library-secondary"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Staff Login"}
            </Button>
          </form>
          
          <div className="mt-4 p-3 border-t pt-4 text-sm text-gray-600">
            <p>For librarian account requests, please contact the library IT department.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginForm;
