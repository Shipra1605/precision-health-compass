import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Home, Stethoscope } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Footer from '@/components/layout/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      let registeredUsers: any[] = [];
      try {
        const registeredUsersString = localStorage.getItem('registeredUsers');
        if (registeredUsersString) {
          registeredUsers = JSON.parse(registeredUsersString);
        }
      } catch (error) {
        console.error("Error parsing registered users from localStorage:", error);
        // Keep registeredUsers as empty array, effectively meaning no users are registered
        // or data is corrupt.
      }

      const foundUser = registeredUsers.find(
        (user: any) => user.email === email && user.password === password
      );

      if (foundUser) {
        const sessionDuration = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 1 * 24 * 60 * 60 * 1000; // 30 days or 1 day
        const expiryDate = new Date(Date.now() + sessionDuration);
        
        const userDataForSession = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name, 
          fullName: foundUser.name, // Ensure fullName is set from registered name
          age: foundUser.age || "30", 
          gender: foundUser.gender || "Prefer not to say", 
          height: foundUser.height || "170", 
          weight: foundUser.weight || "70", 
          existingIllness: foundUser.existingIllness || "none", 
          sessionExpiry: expiryDate.toISOString(),
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userDataForSession));
        
        toast({
          title: "Login Successful",
          description: "Welcome back to MediCare AI!",
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials or user not registered. Please check your details or sign up.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen page-background">
      <div className="h-16 p-4 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
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
              <h1 className="text-2xl font-bold font-heading mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to access your health dashboard</p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe} 
                    onCheckedChange={(checked) => setRememberMe(!!checked)} 
                  />
                  <Label htmlFor="remember" className="text-sm leading-none">
                    Remember me for 30 days
                  </Label>
                </div>
                
                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700" 
                  type="submit" 
                  disabled={isLoading || !email || !password}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>Sign In</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-teal-600 hover:underline font-medium">
                  Create an account
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

export default Login;
