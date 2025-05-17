
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'; // Changed from MainNavbar
import Footer from '@/components/layout/Footer';
import { useToast } from '@/components/ui/use-toast';
import PatientInfoCard from '@/components/dashboard/PatientInfoCard';
import MedicalRecordsCard from '@/components/dashboard/MedicalRecordsCard';
import PreviousRecommendationsCard from '@/components/dashboard/PreviousRecommendationsCard';
import SymptomAnalysisCard from '@/components/dashboard/SymptomAnalysisCard';
import ActiveRecommendationCard from '@/components/dashboard/ActiveRecommendationCard';
import MainLayout from '@/components/layout/MainLayout'; // Ensure MainLayout is used for auth protection

// Define UserData type here or import from a shared types file
export interface UserData {
  id: string;
  email: string;
  fullName: string; // Ensure this matches what's stored
  name?: string; // Optional, if 'name' is also stored from older versions
  age: string;
  gender: string;
  height: string;
  weight: string;
  existingIllness: string;
  sessionExpiry?: string; // From session data
}

export interface MedicalRecord {
  id: string;
  name: string;
  date: Date;
}

export interface Recommendation {
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
  // Renamed from activeRecommendation to activeRecommendationDetails for clarity
  const [activeRecommendationDetails, setActiveRecommendationDetails] = useState<Recommendation | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const currentUserString = localStorage.getItem('currentUser');
    if (!currentUserString) {
      // This check might be redundant if MainLayout or ProtectedRoute handles it,
      // but good for safety.
      navigate('/login');
      return;
    }
    
    let loadedUser: UserData;
    try {
      loadedUser = JSON.parse(currentUserString);
      // Ensure fullName is present, potentially fallback to 'name' if migrating old data
      if (!loadedUser.fullName && loadedUser.name) {
        loadedUser.fullName = loadedUser.name;
      }
      setUser(loadedUser);
      
      // Load saved medical records
      const savedRecords = localStorage.getItem(`records_${loadedUser.id}`);
      if (savedRecords) {
        setMedicalRecords(JSON.parse(savedRecords).map((record: any) => ({
          ...record,
          date: new Date(record.date)
        })));
      }
      
      // Load saved recommendations
      const savedRecommendations = localStorage.getItem(`recommendations_${loadedUser.id}`);
      if (savedRecommendations) {
        setRecommendations(JSON.parse(savedRecommendations).map((rec: any) => ({
          ...rec,
          date: new Date(rec.date)
        })));
      }
    } catch (error) {
      console.error("Error processing user data for dashboard:", error);
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  }, [navigate]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && user) {
      const file = e.target.files[0];
      const newRecord: MedicalRecord = {
        id: Date.now().toString(),
        name: file.name,
        date: new Date()
      };
      const updatedRecords = [...medicalRecords, newRecord];
      setMedicalRecords(updatedRecords);
      localStorage.setItem(`records_${user.id}`, JSON.stringify(updatedRecords));
      toast({
        title: "Success",
        description: "Medical record uploaded successfully",
      });
      e.target.value = ''; // Clear file input
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
      setTimeout(() => {
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
        const confidence = Math.floor(Math.random() * 30) + 70;
        
        const newRecommendation: Recommendation = {
          id: Date.now().toString(),
          date: new Date(),
          symptoms: symptoms,
          recommendation: `${treatmentOptions[randomIndex]}. ${explanations[randomIndex]}`,
          confidenceScore: confidence
        };
        
        const updatedRecommendations = [newRecommendation, ...recommendations]; // Add to top
        setRecommendations(updatedRecommendations);
        setActiveRecommendationDetails(newRecommendation); // Show the new one
        localStorage.setItem(`recommendations_${user.id}`, JSON.stringify(updatedRecommendations));
        setIsAnalyzing(false);
        setSymptoms('');
        toast({
          title: "Analysis Complete",
          description: "Treatment recommendation generated",
        });
      }, 2000); // Reduced delay for snappier feel
    }
  };

  // Renamed from viewRecommendation to viewRecommendationDetails
  const viewRecommendationDetails = (rec: Recommendation) => {
    setActiveRecommendationDetails(rec);
  };

  // The MainLayout component should handle the loading state / auth redirection primarily.
  // The !user check here is a secondary safety.
  if (!user) {
     // ProtectedRoute or MainLayout should ideally handle this redirection.
     // If user becomes null after initial load (e.g. session expiry detected elsewhere),
     // this will show loading until navigation happens.
    return (
      <div className="flex flex-col min-h-screen page-background">
        <DashboardNavbar />
        <main className="flex-grow flex items-center justify-center">
           <div>Loading patient dashboard...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    // MainLayout handles overall page structure and auth protection
    <MainLayout requireAuth={true}>
      <div className="min-h-screen flex flex-col page-background"> {/* This div might be redundant if MainLayout provides similar structure */}
        <DashboardNavbar /> 
        <main className="flex-grow bg-medical-background"> {/* Ensure bg-medical-background is defined or use Tailwind equivalent */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <PatientInfoCard patient={user} />
                  <MedicalRecordsCard
                    user={user}
                    medicalRecords={medicalRecords}
                    onFileUpload={handleFileUpload}
                  />
                  <PreviousRecommendationsCard
                    recommendations={recommendations}
                    onViewRecommendation={viewRecommendationDetails}
                  />
                </div>
              </div>
              
              {/* Main content */}
              <div className="lg:col-span-2 space-y-6">
                <SymptomAnalysisCard
                  symptoms={symptoms}
                  onSymptomsChange={setSymptoms}
                  onSubmit={handleSymptomSubmit}
                  isAnalyzing={isAnalyzing}
                />
                <ActiveRecommendationCard recommendation={activeRecommendationDetails} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </MainLayout>
  );
};

export default Dashboard;

