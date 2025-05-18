
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
  const [currentUser, setCurrentUser] = useState<Partial<UserData> & { email?: string; id?: string; name?: string; password?: string; needsProfileSetup?: boolean } | null>(null);
  const [profileSetupComplete, setProfileSetupComplete] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    age: '', // Keep as string for form input
    gender: '',
    heightCm: '', // Keep as string
    weightKg: '', // Keep as string
    existingIllness: '',
  });

  useEffect(() => {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      const user = JSON.parse(userString);
      setCurrentUser(user);
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || user.name || '',
        age: user.age?.toString() || '', // Convert number to string for input
        gender: user.gender || '',
        heightCm: user.heightCm?.toString() || '', // Convert to string
        weightKg: user.weightKg?.toString() || '', // Convert to string
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
    if (!currentUser || !currentUser.id || !currentUser.email) { // Added email check for type safety
      toast({ title: 'Error', description: 'User session not found.', variant: 'destructive' });
      navigate('/login');
      return;
    }

    const updatedUserData: UserData = {
      // Base user data that must exist
      id: currentUser.id,
      email: currentUser.email,
      name: currentUser.name || formData.fullName, // Ensure name exists
      password: currentUser.password || '', // Ensure password exists (even if empty, UserData expects it)
      
      // Form data
      fullName: formData.fullName,
      age: formData.age ? parseInt(formData.age, 10) : undefined,
      gender: formData.gender || undefined,
      heightCm: formData.heightCm ? parseInt(formData.heightCm, 10) : undefined,
      weightKg: formData.weightKg ? parseInt(formData.weightKg, 10) : undefined,
      existingIllness: formData.existingIllness || undefined,
      
      // Merge other existing currentUser properties
      ...currentUser,

      // Profile setup specific
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
    
    setProfileSetupComplete(true);
  };

  if (profileSetupComplete) {
    return (
      <div className="page-container auth-pages-bg"> {/* Will be updated by CSS changes */}
        <Navbar />
        <main className="page-content-overlay flex-grow flex flex-col items-center justify-center p-6 text-center">
          <div className="glass-panel p-8 md:p-12 rounded-xl shadow-2xl max-w-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-heading">🎉 Welcome, {formData.fullName || currentUser?.name}!</h2>
            <p className="text-lg text-gray-700 mb-8">Your account has been successfully created.</p>
            <div className="space-y-4">
              <Link to="/login">
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3">
                  Login Now
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full border-teal-300 text-teal-700 hover:bg-teal-50 py-3">
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-heading">Complete Your Profile</h2>
              <p className="text-gray-600 mt-1">Tell us a bit more about yourself.</p>
            </div>
            
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required className="bg-white/70"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age (Years)</Label>
                <Input id="age" type="number" value={formData.age} onChange={handleChange} placeholder="30" required className="bg-white/70"/>
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => handleSelectChange('gender', value)} value={formData.gender}>
                  <SelectTrigger className="w-full bg-white/70"><SelectValue placeholder="Select gender" /></SelectTrigger>
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
                <Label htmlFor="heightCm">Height (cm)</Label>
                <Input id="heightCm" type="number" value={formData.heightCm} onChange={handleChange} placeholder="175" className="bg-white/70"/>
              </div>
              <div>
                <Label htmlFor="weightKg">Weight (kg)</Label>
                <Input id="weightKg" type="number" value={formData.weightKg} onChange={handleChange} placeholder="70" className="bg-white/70"/>
              </div>
            </div>
            <div>
              <Label htmlFor="existingIllness">Existing Medical Conditions (comma-separated)</Label>
              <Textarea
                id="existingIllness"
                value={formData.existingIllness}
                onChange={handleChange}
                placeholder="e.g., Asthma, Diabetes, None"
                rows={3}
                className="bg-white/70"
              />
            </div>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3">
              Save Profile
            </Button>
             <p className="text-center text-sm text-gray-500">
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

