import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import React, { useState } from 'react';
import { UserData } from '@/types';
import Logo from '@/components/layout/Logo'; // For signup form header


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

    // Create a partial user object for UserData type compatibility
    const newUserBase: Pick<UserData, 'id' | 'name' | 'email' | 'password'> = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };
    
    // UserData requires all fields, so provide defaults or undefined for optional ones not yet collected
    const newUserForStorage: UserData = {
      ...newUserBase,
      fullName: name, // Use initial name as fullName temporarily
      // other UserData fields will be undefined or have default values
      // They will be properly set in ProfileSetup
    };
    
    // Store minimal info for profile setup redirection, including `needsProfileSetup`
    const currentUserForSetup = { 
      id: newUserBase.id, 
      email: newUserBase.email, 
      name: newUserBase.name, 
      password: newUserBase.password, // Pass password for UserData consistency
      needsProfileSetup: true 
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUserForSetup));
    
    registeredUsers.push(newUserForStorage);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    toast({
      title: 'Account Created!',
      description: 'Please complete your profile to continue.',
      className: "bg-brand-teal text-white"
    });
    navigate('/profile-setup');
  };

  return (
    <div className="page-container auth-pages-bg">
      <Navbar />
      <main className="page-content-overlay flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSignup}
            className="glass-panel p-8 md:p-10 rounded-xl shadow-2xl space-y-6"
          >
            <div className="text-center mb-4">
              <div className="inline-block mb-4">
                <Logo size="xl" textColor="text-brand-navy"/>
              </div>
              <h2 className="text-3xl font-bold text-brand-navy font-heading">Create Account</h2>
              <p className="text-brand-navy/70 mt-1">Start your journey with MediCare AI.</p>
            </div>
             <div className="space-y-2">
              <Label htmlFor="name" className="text-brand-navy/90">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/80 border-border focus:bg-white focus:border-brand-teal"
              />
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
                placeholder="Choose a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/80 border-border focus:bg-white focus:border-brand-teal"
              />
            </div>
            <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white py-3 text-base shadow-md hover:shadow-lg">
              Sign Up
            </Button>
            <p className="text-center text-sm text-brand-navy/70">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-brand-teal hover:text-brand-teal-dark hover:underline">
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
