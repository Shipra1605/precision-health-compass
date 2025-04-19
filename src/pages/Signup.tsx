
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Activity, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountData {
  email: string;
  password: string;
}

interface PersonalData {
  fullName: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  existingIllness: string;
}

const Signup: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [accountData, setAccountData] = useState<AccountData>({ email: '', password: '' });
  const [personalData, setPersonalData] = useState<PersonalData>({
    fullName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    existingIllness: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountData.email || !accountData.password) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = existingUsers.some((user: any) => user.email === accountData.email);
    
    if (userExists) {
      toast({
        title: "Error",
        description: "Email already in use. Please use a different email or login.",
        variant: "destructive"
      });
      return;
    }
    
    setStep(2);
  };

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalData.fullName || !personalData.age || !personalData.gender) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Save user data to localStorage
      const userData = {
        ...accountData,
        ...personalData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      // Get existing users or create empty array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      localStorage.setItem('users', JSON.stringify([...existingUsers, userData]));
      
      // Also set as current user
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      setStep(3);
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description: "An error occurred during signup. Please try again.",
        variant: "destructive"
      });
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-white px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-teal-100/30 blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-blue-100/30 blur-3xl"></div>
      </div>
      
      <div className="mb-8 flex items-center gap-2 relative z-10">
        <div className="relative h-12 w-12 flex items-center justify-center bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full shadow-md">
          <Activity className="h-8 w-8 text-white" />
        </div>
        <span className="text-2xl font-bold text-teal-600">MediCare AI</span>
      </div>
      
      <Card className="w-full max-w-md relative z-10 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center">
            {step === 3 ? "Account Created Successfully!" : "New User – Please Create Your Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1 && "Step 1: Account Setup"}
            {step === 2 && "Step 2: Personal Details"}
            {step === 3 && "Welcome to MediCare AI"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {step === 1 && (
            <form onSubmit={handleAccountSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="youremail@example.com"
                  value={accountData.email}
                  onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Create a secure password"
                  value={accountData.password}
                  onChange={(e) => setAccountData({...accountData, password: e.target.value})}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full mt-6 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 transition-colors">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}
          
          {step === 2 && (
            <form onSubmit={handlePersonalSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="Enter your full name"
                  value={personalData.fullName}
                  onChange={(e) => setPersonalData({...personalData, fullName: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    placeholder="Years"
                    value={personalData.age}
                    onChange={(e) => setPersonalData({...personalData, age: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    value={personalData.gender}
                    onValueChange={(value) => setPersonalData({...personalData, gender: value})}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    placeholder="In centimeters"
                    value={personalData.height}
                    onChange={(e) => setPersonalData({...personalData, height: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    placeholder="In kilograms"
                    value={personalData.weight}
                    onChange={(e) => setPersonalData({...personalData, weight: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="existingIllness">Existing Illness</Label>
                <Select 
                  value={personalData.existingIllness}
                  onValueChange={(value) => setPersonalData({...personalData, existingIllness: value})}
                >
                  <SelectTrigger id="existingIllness">
                    <SelectValue placeholder="Select if any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="diabetes">Diabetes</SelectItem>
                    <SelectItem value="hypertension">Hypertension</SelectItem>
                    <SelectItem value="asthma">Asthma</SelectItem>
                    <SelectItem value="arthritis">Arthritis</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full mt-6 bg-teal-600 hover:bg-teal-700 transition-colors">Submit</Button>
            </form>
          )}
          
          {step === 3 && (
            <div className="text-center py-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-green-100 blur-md animate-pulse-subtle"></div>
                  <CheckCircle className="h-16 w-16 text-green-500 relative" />
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Your account has been created successfully. You can now log in to access your dashboard.
              </p>
            </div>
          )}
        </CardContent>
        
        {step === 3 && (
          <CardFooter>
            <Button onClick={() => navigate('/dashboard')} className="w-full bg-teal-600 hover:bg-teal-700 transition-colors">
              Go to Dashboard
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Signup;
