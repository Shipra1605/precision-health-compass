
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { LogIn } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    setTimeout(() => {
      if (user) {
        // Store current user in session
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000); // Simulate network request
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-white px-4 py-12">
      <div className="mb-8 flex items-center gap-2">
        <img 
          src="/lovable-uploads/ada3d3a6-2579-48cf-9503-3ff02f7da658.png" 
          alt="MediCare AI Logo" 
          className="h-12 w-auto"
        />
        <span className="text-2xl font-bold text-teal-600">MediCare AI</span>
      </div>
      
      <Card className="w-full max-w-md hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-center">Log In to Your Account</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your personalized dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-6 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Log In
                </>
              )}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t pt-4">
          <Button 
            variant="link" 
            onClick={() => navigate('/signup')}
            className="text-teal-600 hover:text-teal-700"
          >
            Don't have an account? Create one
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
