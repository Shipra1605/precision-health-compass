import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import React, { useState } from 'react';
import { UserData } from '@/types';


const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();


  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const registeredUsersString = localStorage.getItem('registeredUsers');
    let registeredUsers: UserData[] = registeredUsersString
      ? JSON.parse(registeredUsersString)
      : [];

    if (registeredUsers.find((user) => user.email === email)) {
      toast({
        title: 'Signup Failed',
        description: 'This email is already registered.',
        variant: 'destructive',
      });
      return;
    }

    const newUser: UserData = {
      id: Date.now().toString(),
      name, // This is the initial name (e.g. username)
      email,
      password,
      // Full profile details will be collected in ProfileSetup
    };
    
    // Store minimal info to indicate user is mid-signup for profile setup
    localStorage.setItem('currentUser', JSON.stringify({ id: newUser.id, email: newUser.email, name: newUser.name, needsProfileSetup: true }));
    
    // Add to registered users list (without full profile yet)
    registeredUsers.push(newUser); // Store the user object as is for now
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    toast({
      title: 'Account Created!',
      description: 'Please complete your profile.',
    });
    navigate('/profile-setup');
  };

  return (
    <div className="page-container auth-pages-bg"> {/* Applied auth-pages-bg */}
      <Navbar />
      <main className="page-content-overlay flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSignup}
            className="glass-panel p-8 md:p-10 rounded-xl shadow-2xl space-y-6" // Enhanced panel
          >
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-heading">Create Account</h2>
              <p className="text-gray-600 mt-1">Start your journey with MediCare AI.</p>
            </div>
             <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/70"
              />
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
              Sign Up
            </Button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-teal-600 hover:text-teal-700">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
