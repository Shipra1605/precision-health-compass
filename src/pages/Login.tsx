
import React, { useState } from 'react';
// Navbar and Footer are part of the page structure, not MainLayout for auth pages
import Navbar from '@/components/layout/Navbar'; 
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { UserData } from '@/types';
import Logo from '@/components/layout/Logo'; // For login form header

interface StoredUser extends UserData {
  needsProfileSetup?: boolean;
  sessionExpiry?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const registeredUsersString = localStorage.getItem('registeredUsers');
    if (registeredUsersString) {
      const registeredUsers: StoredUser[] = JSON.parse(registeredUsersString);
      const user = registeredUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        if (user.needsProfileSetup === true) {
           const userForProfileSetup = { ...user, needsProfileSetup: true }; // keep needsProfileSetup
           localStorage.setItem('currentUser', JSON.stringify(userForProfileSetup));
           toast({
             title: 'Profile Incomplete',
             description: 'Please complete your profile setup.',
             className: "bg-yellow-500 text-white"
           });
           navigate('/profile-setup');
        } else {
          const userToStore = { 
            ...user, 
            needsProfileSetup: false, // Explicitly set to false
            sessionExpiry: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString() 
          };
          localStorage.setItem('currentUser', JSON.stringify(userToStore));
          toast({
            title: 'Login Successful',
            description: `Welcome back, ${user.name || user.fullName}!`,
            className: "bg-brand-teal text-white"
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
    // Auth pages get their background from this class in page-container
    <div className="page-container auth-pages-bg">
      <Navbar />
      <main className="page-content-overlay flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleLogin}
            className="glass-panel p-8 md:p-10 rounded-xl shadow-2xl space-y-6"
          >
            <div className="text-center mb-4">
              <div className="inline-block mb-4">
                <Logo size="xl" textColor="text-brand-navy"/>
              </div>
              <h2 className="text-3xl font-bold text-brand-navy font-heading">Welcome Back!</h2>
              <p className="text-brand-navy/70 mt-1">Sign in to access your MediCare AI dashboard.</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-brand-navy/90">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/80 border-border focus:bg-white focus:border-brand-teal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-brand-navy/90">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/80 border-border focus:bg-white focus:border-brand-teal"
              />
            </div>
            <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white py-3 text-base shadow-md hover:shadow-lg">
              Sign In
            </Button>
            <p className="text-center text-sm text-brand-navy/70">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-brand-teal hover:text-brand-teal-dark hover:underline">
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

