import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useToast } from '@/components/ui/use-toast';
import PatientInfoCard from '@/components/dashboard/PatientInfoCard';
import MedicalRecordsCard from '@/components/dashboard/MedicalRecordsCard';
import PreviousRecommendationsCard from '@/components/dashboard/PreviousRecommendationsCard';
import SymptomAnalysisCard from '@/components/dashboard/SymptomAnalysisCard';
import ActiveRecommendationCard from '@/components/dashboard/ActiveRecommendationCard';
import { UserData, MedicalRecord, Recommendation } from '@/types';

// Temporary interface to handle potentially missing needsProfileSetup
interface CurrentUserStored extends UserData {
  needsProfileSetup?: boolean;
  sessionExpiry?: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeRecommendationDetails, setActiveRecommendationDetails] = useState<Recommendation | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const currentUserString = localStorage.getItem('currentUser');
    if (!currentUserString) {
      navigate('/login');
      return;
    }
    
    let loadedUser: CurrentUserStored;
    try {
      loadedUser = JSON.parse(currentUserString);
      // Check for needsProfileSetup, which is not part of UserData type but added dynamically
      if (loadedUser.needsProfileSetup === true) { 
        navigate('/profile-setup');
        return;
      }
      // Ensure fullName is present, fallback to name if necessary
      if (!loadedUser.fullName && loadedUser.name) {
        loadedUser.fullName = loadedUser.name;
      }
      setUser(loadedUser as UserData); // Cast to UserData after checks
      
      if (loadedUser.id) {
        const savedRecords = localStorage.getItem(`records_${loadedUser.id}`);
        if (savedRecords) {
          setMedicalRecords(JSON.parse(savedRecords).map((record: any) => ({
            ...record,
            date: new Date(record.date)
          })));
        }
        
        const savedRecommendations = localStorage.getItem(`recommendations_${loadedUser.id}`);
        if (savedRecommendations) {
          setRecommendations(JSON.parse(savedRecommendations).map((rec: any) => ({
            ...rec,
            date: new Date(rec.date)
          })));
        }
      }
    } catch (error) {
      console.error("Error processing user data for dashboard:", error);
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  }, [navigate]);

  const handlePatientUpdate = (updatedData: Partial<UserData>) => {
    setUser(prevUser => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...updatedData };
      // Persist these changes to localStorage as well for currentUser
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      // And update registeredUsers if this user is in there
      if (newUser.id) {
        const registeredUsersString = localStorage.getItem('registeredUsers');
        if (registeredUsersString) {
          let registeredUsers: UserData[] = JSON.parse(registeredUsersString);
          const userIndex = registeredUsers.findIndex(u => u.id === newUser.id);
          if (userIndex !== -1) {
            registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...updatedData };
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
          }
        }
      }
      return newUser;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && user && user.id) {
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
      e.target.value = ''; 
    }
  };

  const handleDeleteRecord = (recordId: string) => {
    if (!user || !user.id) return;
    const updatedRecords = medicalRecords.filter(record => record.id !== recordId);
    setMedicalRecords(updatedRecords);
    localStorage.setItem(`records_${user.id}`, JSON.stringify(updatedRecords));
    toast({
      title: "Record Deleted",
      description: "The medical record has been removed.",
      variant: "destructive"
    });
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
    
    if (user && user.id) {
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
        
        const updatedRecommendations = [newRecommendation, ...recommendations];
        setRecommendations(updatedRecommendations);
        setActiveRecommendationDetails(newRecommendation);
        localStorage.setItem(`recommendations_${user.id}`, JSON.stringify(updatedRecommendations));
        setIsAnalyzing(false);
        setSymptoms('');
        toast({
          title: "Analysis Complete",
          description: "Treatment recommendation generated",
        });
      }, 2000);
    }
  };

  const viewRecommendationDetails = (rec: Recommendation) => {
    setActiveRecommendationDetails(rec);
  };

  if (!user) {
    return (
      <MainLayout requireAuth={true}>
        <div className="flex-grow flex items-center justify-center">
           <div>Loading patient dashboard...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout requireAuth={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* The "MediCare AI Dashboard" title is handled by the Logo in MainNavbar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <PatientInfoCard patient={user} onUpdatePatient={handlePatientUpdate} />
            <MedicalRecordsCard
              user={user}
              medicalRecords={medicalRecords}
              onFileUpload={handleFileUpload}
              onDeleteRecord={handleDeleteRecord} // This prop makes the delete button functional
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <SymptomAnalysisCard
              symptoms={symptoms}
              onSymptomsChange={setSymptoms}
              onSubmit={handleSymptomSubmit}
              isAnalyzing={isAnalyzing}
            />
            <PreviousRecommendationsCard
              recommendations={recommendations}
              onViewRecommendation={viewRecommendationDetails}
            />
            {/* ActiveRecommendationCard's heading is internal and cannot be changed as it's read-only.
                I will note this to the user. The request was "Get Your Personalized Medical Treatment". */}
            <ActiveRecommendationCard recommendation={activeRecommendationDetails} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
