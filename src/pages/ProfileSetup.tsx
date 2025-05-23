import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { UserData } from '@/types';

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  // currentUser type now directly uses UserData from '@/types' which includes optional needsProfileSetup and sessionExpiry
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [profileSetupComplete, setProfileSetupComplete] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    age: '', // Expects string
    gender: '',
    heightCm: '', // Expects string
    weightKg: '', // Expects string
    existingIllness: '',
  });

  useEffect(() => {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      const user: UserData = JSON.parse(userString); // UserData type
      setCurrentUser(user);
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || user.name || '',
        age: user.age || '', // UserData.age is string | undefined
        gender: user.gender || '',
        heightCm: user.heightCm || '', // UserData.heightCm is string | undefined
        weightKg: user.weightKg || '', // UserData.weightKg is string | undefined
        existingIllness: user.existingIllness || '',
      }));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !currentUser.id || !currentUser.email) {
      toast({ title: 'Error', description: 'User session not found.', variant: 'destructive' });
      navigate('/login');
      return;
    }

    // Construct updatedUserData ensuring all required fields of UserData are present
    // and optional fields are correctly handled.
    const updatedUserData: UserData = {
      // Spread existing currentUser data first
      ...currentUser,
      
      // Explicitly set required fields from currentUser if not changed by form
      id: currentUser.id,
      email: currentUser.email,
      // name is optional, can be derived from fullName or kept if already there
      name: formData.fullName || currentUser.name || currentUser.fullName || '', 
      password: currentUser.password || '', // Keep existing password if any

      // Override with form data
      fullName: formData.fullName,
      age: formData.age || undefined, 
      gender: formData.gender || undefined,
      heightCm: formData.heightCm || undefined, 
      weightKg: formData.weightKg || undefined, 
      existingIllness: formData.existingIllness || undefined,
      
      // Profile setup specific properties (now part of UserData type)
      profileImageBase64: currentUser.profileImageBase64 || '', 
      needsProfileSetup: false, 
      sessionExpiry: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()
    };

    const registeredUsersString = localStorage.getItem('registeredUsers');
    let registeredUsers: UserData[] = registeredUsersString ? JSON.parse(registeredUsersString) : [];
    const userIndex = registeredUsers.findIndex(u => u.id === currentUser.id);

    if (userIndex !== -1) {
      registeredUsers[userIndex] = updatedUserData;
    } else {
      registeredUsers.push(updatedUserData);
    }
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
    
    toast({
      title: 'Profile Saved!',
      description: 'Your profile information has been updated successfully.',
      className: 'bg-green-500 text-white',
    });
    setProfileSetupComplete(true);
  };

  if (profileSetupComplete) {
    return (
      <div className="page-container auth-pages-bg"> {/* Will be updated by CSS changes */}
        <Navbar />
        <main className="page-content-overlay flex-grow flex flex-col items-center justify-center p-6 text-center">
          <div className="glass-panel p-8 md:p-12 rounded-xl shadow-2xl max-w-lg">
            <h2 className="text-3xl font-bold text-brand-navy mb-4 font-heading">🎉 Welcome, {formData.fullName || currentUser?.name}!</h2>
            <p className="text-lg text-brand-navy/80 mb-8">Your account has been successfully created.</p>
            <div className="space-y-4">
              <Link to="/login">
                <Button className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white py-3">
                  Login Now
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full border-brand-teal text-brand-teal hover:bg-brand-teal/10 hover:text-brand-teal-dark py-3">
                  Go to Homepage
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container auth-pages-bg"> {/* Will be updated by CSS changes */}
      <Navbar />
      <main className="page-content-overlay flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <form
            onSubmit={handleSubmit}
            className="glass-panel p-8 md:p-10 rounded-xl shadow-2xl space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-heading">Complete Your Profile</h2>
              <p className="text-brand-navy/70 mt-1">Tell us a bit more about yourself.</p>
            </div>
            
            <div>
              <Label htmlFor="fullName" className="text-brand-navy/90">Full Name</Label>
              <Input id="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required className="bg-white/80 border-border focus:bg-white focus:border-brand-teal"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age" className="text-brand-navy/90">Age (Years)</Label>
                <Input id="age" type="number" value={formData.age} onChange={handleChange} placeholder="30" required className="bg-white/80 border-border focus:bg-white focus:border-brand-teal"/>
              </div>
              <div>
                <Label htmlFor="gender" className="text-brand-navy/90">Gender</Label>
                <Select onValueChange={(value) => handleSelectChange('gender', value)} value={formData.gender}>
                  <SelectTrigger className="w-full bg-white/80 border-border focus:bg-white focus:border-brand-teal"><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="heightCm" className="text-brand-navy/90">Height (cm)</Label>
                <Input id="heightCm" type="number" value={formData.heightCm} onChange={handleChange} placeholder="175" className="bg-white/80 border-border focus:bg-white focus:border-brand-teal"/>
              </div>
              <div>
                <Label htmlFor="weightKg" className="text-brand-navy/90">Weight (kg)</Label>
                <Input id="weightKg" type="number" value={formData.weightKg} onChange={handleChange} placeholder="70" className="bg-white/80 border-border focus:bg-white focus:border-brand-teal"/>
              </div>
            </div>
            <div>
              <Label htmlFor="existingIllness" className="text-brand-navy/90">Existing Medical Conditions (comma-separated)</Label>
              <Textarea
                id="existingIllness"
                value={formData.existingIllness}
                onChange={handleChange}
                placeholder="e.g., Asthma, Diabetes, None"
                rows={3}
                className="bg-white/80 border-border focus:bg-white focus:border-brand-teal"
              />
            </div>
            <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white py-3 shadow-md hover:shadow-lg">
              Save Profile
            </Button>
             <p className="text-center text-sm text-brand-navy/70">
              You can update this information later from your dashboard.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileSetup;
