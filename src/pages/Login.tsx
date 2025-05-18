import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { UserData } from '@/types';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const registeredUsersString = localStorage.getItem('registeredUsers');
    if (registeredUsersString) {
      const registeredUsers: UserData[] = JSON.parse(registeredUsersString);
      const user = registeredUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Check for profile completion
        if (!user.fullName || !user.age || !user.gender) {
           // Set temporary flag or part of user object to indicate pending profile setup
          const userForProfileSetup = { ...user, needsProfileSetup: true };
          localStorage.setItem('currentUser', JSON.stringify(userForProfileSetup));
          toast({
            title: 'Profile Incomplete',
            description: 'Please complete your profile setup.',
          });
          navigate('/profile-setup');
        } else {
          const userToStore = { ...user, sessionExpiry: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString() }; // 24h session
          localStorage.setItem('currentUser', JSON.stringify(userToStore));
          toast({
            title: 'Login Successful',
            description: `Welcome back, ${user.name}!`,
          });
          navigate('/dashboard');
        }
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password.',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Login Failed',
        description: 'No registered users found. Please sign up.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="page-container auth-pages-bg"> {/* Applied auth-pages-bg */}
      <Navbar />
      <main className="page-content-overlay flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleLogin}
            className="glass-panel p-8 md:p-10 rounded-xl shadow-2xl space-y-6" // Enhanced panel
          >
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-heading">Welcome Back!</h2>
              <p className="text-gray-600 mt-1">Sign in to access your dashboard.</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/70"
              />
            </div>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3">
              Sign In
            </Button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-700">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
