
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Footer from '@/components/layout/Footer';
import { Stethoscope, Home, ArrowRight } from 'lucide-react';
import { UserData } from '@/types';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [existingIllness, setExistingIllness] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      // Pre-fill full name if initial name was captured and available, assuming 'name' was passed
      if (location.state?.name) {
        setFullName(location.state.name);
      }
    } else {
      // If no email in state, redirect to signup as this page shouldn't be accessed directly without prior step
      toast({
        title: "Error",
        description: "No user context found. Please sign up first.",
        variant: "destructive",
      });
      navigate('/signup');
    }
  }, [location.state, navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !age || !gender || !heightCm || !weightKg) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      const registeredUsersString = localStorage.getItem('registeredUsers');
      let registeredUsers: UserData[] = registeredUsersString ? JSON.parse(registeredUsersString) : [];
      
      const userIndex = registeredUsers.findIndex(user => user.email === email);

      if (userIndex === -1) {
        toast({
          title: "Error",
          description: "Could not find user data to update. Please try signing up again.",
          variant: "destructive",
        });
        setIsLoading(false);
        navigate('/signup');
        return;
      }

      registeredUsers[userIndex] = {
        ...registeredUsers[userIndex],
        fullName: fullName,
        age: age,
        gender: gender,
        heightCm: heightCm,
        weightKg: weightKg,
        existingIllness: existingIllness,
        // 'name' field from initial signup is kept, fullName is the comprehensive one
      };

      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      toast({
        title: "Profile Updated!",
        description: "Your account details have been saved. Welcome to MediCare AI!",
      });
      
      // Instead of direct login, show a message and a button to login page
      // This will be handled by changing the UI state rather than navigation for this step.
      // For simplicity here, we will navigate to a success state or login page.
      // For now, let's just navigate to login after success message.
      // A better UX might be to display this message on the same page and then a login button.
      // To achieve that, we'd need another state variable to control the view.

      setIsLoading(false);
      // Simulate showing a success message and then offering login
      // For this implementation, we'll just navigate to login.
      // A more complex implementation could render a success view on this page.
      // For now, we'll simplify and send to login with a toast.
      navigate('/login', { state: { profileSetupComplete: true, userName: fullName } });

    }, 1000);
  };
  
  return (
    <div className="flex flex-col min-h-screen page-background">
      <div className="h-16 p-4 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-teal-600 mr-1" />
            <div className="flex-shrink-0 text-teal-600 font-bold text-xl">MediCare AI</div>
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
        <div className="w-full max-w-lg"> {/* Increased max-width for more fields */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold font-heading mb-2">Complete Your Profile</h1>
              <p className="text-gray-600">Tell us a bit more about yourself to personalize your experience.</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 30" required />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Non-binary">Non-binary</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="heightCm">Height (cm)</Label>
                    <Input id="heightCm" type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="e.g., 170" required />
                  </div>
                  <div>
                    <Label htmlFor="weightKg">Weight (kg)</Label>
                    <Input id="weightKg" type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder="e.g., 70" required />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="existingIllness">Existing Medical Conditions (optional)</Label>
                  <Textarea 
                    id="existingIllness" 
                    value={existingIllness} 
                    onChange={(e) => setExistingIllness(e.target.value)} 
                    placeholder="e.g., Asthma, Diabetes, Hypertension. Separate with commas." 
                    rows={3}
                  />
                   <p className="text-xs text-gray-500 mt-1">If none, you can leave this blank or type "None".</p>
                </div>
                
                <Button 
                  className="w-full bg-teal-600 hover:bg-teal-700" 
                  type="submit"
                  disabled={isLoading || !fullName || !age || !gender || !heightCm || !weightKg }
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full" />
                      <span>Saving Profile...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>Save and Continue</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSetup;
