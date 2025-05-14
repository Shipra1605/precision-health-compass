
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Home, Stethoscope } from 'lucide-react'; // Added Stethoscope
import { useToast } from '@/components/ui/use-toast';
import Footer from '@/components/layout/Footer';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration delay
    setTimeout(() => {
      const registeredUsersString = localStorage.getItem('registeredUsers');
      const registeredUsers = registeredUsersString ? JSON.parse(registeredUsersString) : [];

      const emailExists = registeredUsers.some((user: any) => user.email === email);

      if (emailExists) {
        toast({
          title: "Registration Failed",
          description: "This email address is already registered.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const newUserData = { 
        id: `user_${Date.now()}`, 
        name, 
        email, 
        // Storing password directly in localStorage is not secure for real applications.
        // This is for demonstration purposes only.
        password 
      };
      
      registeredUsers.push(newUserData);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      // Set current user session
      const sessionDuration = 1 * 24 * 60 * 60 * 1000; // 1 day
      const expiryDate = new Date(Date.now() + sessionDuration);
      const userDataForSession = {
        id: newUserData.id,
        name: newUserData.name,
        email: newUserData.email,
        // Mock data for dashboard until profile setup is implemented
        age: "30", // Default age
        gender: "Prefer not to say", // Default gender
        height: "170", // Default height in cm
        weight: "70", // Default weight in kg
        existingIllness: "none", // Default illness
        fullName: newUserData.name, // Use provided name for fullName
        sessionExpiry: expiryDate.toISOString(),
      };
      localStorage.setItem('currentUser', JSON.stringify(userDataForSession));
      
      toast({
        title: "Account Created",
        description: "Welcome to MediCare AI! Your account has been created successfully.",
      });
      
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen page-background">
      <div className="h-16 p-4 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center"> {/* Added this div for consistency */}
              <Stethoscope className="h-5 w-5 text-teal-600 mr-1" />
              <div className="flex-shrink-0 text-teal-600 font-bold text-xl">MediCare AI</div>
            </div>
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm" className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:text-teal-700">
              <Home className="h-4 w-4 mr-2" />
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold font-heading mb-2">Create an Account</h1>
              <p className="text-gray-600">Sign up to get started with MediCare AI</p>
            </div>
            
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm leading-none">
                    I agree to the terms and conditions
                    {/* Removed Link to "/terms" as it doesn't exist yet 
                        If you want this page, let me know!
                    <Link to="/terms" className="text-teal-600 hover:underline">
                      terms and conditions
                    </Link>
                    */}
                  </Label>
                </div>
                
                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700" 
                  type="submit"
                  disabled={isLoading || !name || !email || !password || !agreeTerms}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>Create Account</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-teal-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;
