
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Heart, ArrowRight, CheckCircle } from 'lucide-react';
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
    
    // Save user data to localStorage
    const userData = {
      ...accountData,
      ...personalData,
      id: Date.now().toString()
    };
    
    // Get existing users or create empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    localStorage.setItem('users', JSON.stringify([...existingUsers, userData]));
    
    setStep(3);
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-medical-background px-4 py-12">
      <div className="mb-8 flex items-center gap-2">
        <Heart className="h-8 w-8 text-medical-primary" />
        <span className="text-2xl font-bold text-medical-primary">Precision Health Compass</span>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {step === 3 ? "Account Created Successfully!" : "New User – Please Create Your Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1 && "Step 1: Account Setup"}
            {step === 2 && "Step 2: Personal Details"}
            {step === 3 && "Welcome, New User"}
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
              
              <Button type="submit" className="w-full mt-6 flex items-center justify-center gap-2">
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
              
              <Button type="submit" className="w-full mt-6">Submit</Button>
            </form>
          )}
          
          {step === 3 && (
            <div className="text-center py-6">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <p className="text-gray-600 mb-6">
                Your account has been created successfully. You can now log in to access your dashboard.
              </p>
            </div>
          )}
        </CardContent>
        
        {step === 3 && (
          <CardFooter>
            <Button onClick={goToLogin} className="w-full">
              Login Now
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Signup;
