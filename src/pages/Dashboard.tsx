import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavbar from '@/components/layout/MainNavbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { User, FileText, BarChart, Upload, List, Activity, Heart } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  fullName: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  existingIllness: string;
}

interface MedicalRecord {
  id: string;
  name: string;
  date: Date;
}

interface Recommendation {
  id: string;
  date: Date;
  symptoms: string;
  recommendation: string;
  confidenceScore: number;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeRecommendation, setActiveRecommendation] = useState<Recommendation | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(currentUser));
    
    // Load saved medical records
    const savedRecords = localStorage.getItem(`records_${JSON.parse(currentUser).id}`);
    if (savedRecords) {
      setMedicalRecords(JSON.parse(savedRecords).map((record: any) => ({
        ...record,
        date: new Date(record.date)
      })));
    }
    
    // Load saved recommendations
    const savedRecommendations = localStorage.getItem(`recommendations_${JSON.parse(currentUser).id}`);
    if (savedRecommendations) {
      setRecommendations(JSON.parse(savedRecommendations).map((rec: any) => ({
        ...rec,
        date: new Date(rec.date)
      })));
    }
  }, [navigate]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && user) {
      const file = e.target.files[0];
      
      // Create a new medical record
      const newRecord: MedicalRecord = {
        id: Date.now().toString(),
        name: file.name,
        date: new Date()
      };
      
      const updatedRecords = [...medicalRecords, newRecord];
      setMedicalRecords(updatedRecords);
      
      // Save to localStorage
      localStorage.setItem(`records_${user.id}`, JSON.stringify(updatedRecords));
      
      toast({
        title: "Success",
        description: "Medical record uploaded successfully",
      });
      
      e.target.value = '';
    }
  };

  const handleSymptomSubmit = () => {
    if (!symptoms.trim()) {
      toast({
        title: "Error",
        description: "Please enter your symptoms",
        variant: "destructive",
      });
      return;
    }
    
    if (user) {
      setIsAnalyzing(true);
      
      // Simulate AI analysis with a delay
      setTimeout(() => {
        // Generate a mock recommendation
        const treatmentOptions = [
          "Rest and hydration with over-the-counter pain medication",
          "Antibiotic treatment with follow-up in 7 days",
          "Anti-inflammatory medication and physical therapy",
          "Consultation with a specialist recommended",
          "Regular monitoring with dietary adjustments"
        ];
        
        const explanations = [
          "Your symptoms suggest a viral infection that typically resolves with supportive care.",
          "Based on your symptoms and history, a bacterial infection is likely requiring antibiotic treatment.",
          "Your symptoms indicate inflammation that would benefit from targeted therapy.",
          "The combination of symptoms suggests a condition that requires specialized evaluation.",
          "Your condition appears stable but requires lifestyle modifications for optimal management."
        ];
        
        const randomIndex = Math.floor(Math.random() * treatmentOptions.length);
        const confidence = Math.floor(Math.random() * 30) + 70; // 70-99%
        
        const newRecommendation: Recommendation = {
          id: Date.now().toString(),
          date: new Date(),
          symptoms: symptoms,
          recommendation: `${treatmentOptions[randomIndex]}. ${explanations[randomIndex]}`,
          confidenceScore: confidence
        };
        
        const updatedRecommendations = [...recommendations, newRecommendation];
        setRecommendations(updatedRecommendations);
        setActiveRecommendation(newRecommendation);
        
        // Save to localStorage
        localStorage.setItem(`recommendations_${user.id}`, JSON.stringify(updatedRecommendations));
        
        setIsAnalyzing(false);
        setSymptoms('');
        
        toast({
          title: "Analysis Complete",
          description: "Treatment recommendation generated",
        });
      }, 3000);
    }
  };

  const viewRecommendation = (rec: Recommendation) => {
    setActiveRecommendation(rec);
  };

  // Function to safely get user initials
  const getUserInitials = (): string => {
    if (!user || !user.fullName) return "?";
    
    const nameParts = user.fullName.split(' ');
    return nameParts.map(part => part[0] || '').join('');
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col page-background">
      <MainNavbar />
      
      <main className="flex-grow bg-medical-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card className="glass-panel">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5 text-medical-primary" />
                      Patient Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="h-20 w-20 rounded-full bg-medical-light flex items-center justify-center text-xl font-bold text-medical-primary">
                          {getUserInitials()}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm text-gray-500">Full Name</div>
                        <div className="font-medium">{user.fullName}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-500">Age</div>
                          <div className="font-medium">{user.age} years</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-gray-500">Gender</div>
                          <div className="font-medium">{user.gender}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-500">Height</div>
                          <div className="font-medium">{user.height} cm</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm text-gray-500">Weight</div>
                          <div className="font-medium">{user.weight} kg</div>
                        </div>
                      </div>
                      
                      {user.existingIllness && user.existingIllness !== 'none' && (
                        <div className="space-y-2">
                          <div className="text-sm text-gray-500">Existing Illness</div>
                          <div className="font-medium">{user.existingIllness}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-medical-primary" />
                      Medical Records
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {medicalRecords.length > 0 ? (
                      <ul className="space-y-2">
                        {medicalRecords.map(record => (
                          <li key={record.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm truncate max-w-[160px]">{record.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {record.date.toLocaleDateString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500 text-center py-4">
                        No previous records found
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <Upload className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">Upload New Record</span>
                        </div>
                        <input 
                          id="file-upload" 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileUpload}
                          accept=".pdf,.jpg,.png,.doc,.docx"
                        />
                      </label>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <List className="h-5 w-5 text-medical-primary" />
                      Previous Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recommendations.length > 0 ? (
                      <ul className="space-y-2">
                        {recommendations.map(rec => (
                          <li 
                            key={rec.id} 
                            className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                            onClick={() => viewRecommendation(rec)}
                          >
                            <div className="font-medium text-sm truncate">{rec.symptoms.substring(0, 30)}{rec.symptoms.length > 30 ? '...' : ''}</div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-500">
                                {rec.date.toLocaleDateString()}
                              </span>
                              <span className="text-xs bg-medical-light/30 px-2 py-0.5 rounded-full">
                                {rec.confidenceScore}% confidence
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500 text-center py-4">
                        No previous AI recommendations
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-medical-primary" />
                    Current Symptoms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Please describe your current symptoms in detail..." 
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <div className="mt-4 flex justify-end">
                    <Button 
                      onClick={handleSymptomSubmit}
                      disabled={!symptoms.trim() || isAnalyzing}
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Submit for Analysis'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-medical-primary" />
                    AI-Powered Treatment Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activeRecommendation ? (
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Symptoms Analyzed</div>
                        <div className="p-3 bg-gray-50 rounded-md text-sm">
                          {activeRecommendation.symptoms}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Recommendation</div>
                        <div className="p-3 bg-medical-light/20 rounded-md text-sm font-medium border-l-4 border-medical-primary">
                          {activeRecommendation.recommendation}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Confidence Score</div>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={activeRecommendation.confidenceScore} 
                            className="h-2"
                          />
                          <span className="text-sm font-medium">{activeRecommendation.confidenceScore}%</span>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            Generated on {activeRecommendation.date.toLocaleString()}
                          </div>
                          <div className="flex items-center text-xs text-medical-primary">
                            <Heart className="h-3 w-3 mr-1" />
                            <span>Precision Health Compass AI</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <BarChart className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-600">No Active Recommendation</h3>
                      <p className="text-sm text-gray-500 max-w-md mt-2">
                        Describe your symptoms in the form above and submit for AI analysis to receive a personalized treatment recommendation.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
