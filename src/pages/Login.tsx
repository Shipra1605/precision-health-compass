
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Home, Stethoscope } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Footer from '@/components/layout/Footer';
import { UserData } from '@/types'; // Import UserData

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.profileSetupComplete) {
      toast({
        title: `Welcome, ${location.state.userName || 'User'}!`,
        description: "Your profile is set up. Please log in to continue.",
      });
    }
  }, [location.state, toast]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      let registeredUsers: UserData[] = [];
      try {
        const registeredUsersString = localStorage.getItem('registeredUsers');
        if (registeredUsersString) {
          registeredUsers = JSON.parse(registeredUsersString);
        }
      } catch (error) {
        console.error("Error parsing registered users from localStorage:", error);
      }

      const foundUser = registeredUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        // Check if essential profile details are filled. If not, redirect to profile setup.
        // This is a fallback, ideally they complete setup after signup.
        if (!foundUser.fullName || !foundUser.age || !foundUser.gender) {
           toast({
            title: "Profile Incomplete",
            description: "Please complete your profile information first.",
            variant: "destructive"
          });
          navigate('/profile-setup', { state: { email: foundUser.email, name: foundUser.name } });
          setIsLoading(false);
          return;
        }


        const sessionDuration = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 1 * 24 * 60 * 60 * 1000; // 30 days or 1 day
        const expiryDate = new Date(Date.now() + sessionDuration);
        
        // Create session data using all available fields from foundUser
        const userDataForSession: UserData = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name, // Initial name
          fullName: foundUser.fullName || foundUser.name, // Prioritize fullName from profile
          age: foundUser.age,
          gender: foundUser.gender,
          heightCm: foundUser.heightCm,
          weightKg: foundUser.weightKg,
          existingIllness: foundUser.existingIllness,
          profileImageBase64: foundUser.profileImageBase64, // Include profile image
          sessionExpiry: expiryDate.toISOString(),
        };
        // Remove password before storing in currentUser session
        const { password: _p, ...secureUserDataForSession } = userDataForSession;

        localStorage.setItem('currentUser', JSON.stringify(secureUserDataForSession));
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${secureUserDataForSession.fullName || secureUserDataForSession.name}!`,
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
