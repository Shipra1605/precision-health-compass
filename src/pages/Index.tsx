
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PatientSummary from '@/components/dashboard/PatientSummary';
import MedicalHistoryPanel from '@/components/dashboard/MedicalHistoryPanel';
import SymptomSelector from '@/components/treatment/SymptomSelector';
import ConditionSelector from '@/components/treatment/ConditionSelector';
import GeneticProfile from '@/components/treatment/GeneticProfile';
import TreatmentPlanView from '@/components/treatment/TreatmentPlanView';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Brain } from 'lucide-react';
import { 
  mockPatient, 
  mockMedicalHistory, 
  mockGeneticProfile, 
  CurrentSymptom, 
  TreatmentPlan,
  generateTreatmentPlan
} from '@/data/mockData';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [selectedSymptoms, setSelectedSymptoms] = useState<CurrentSymptom[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTreatmentPlan = () => {
    if (selectedSymptoms.length === 0 && !selectedCondition) {
      toast({
        title: "Missing Information",
        description: "Please add at least one symptom or select a condition to generate a treatment plan.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate a processing delay to make it feel like ML is happening
    setTimeout(() => {
      const newTreatmentPlan = generateTreatmentPlan(
        mockPatient,
        mockMedicalHistory,
        mockGeneticProfile,
        selectedSymptoms,
        selectedCondition
      );
      
      setTreatmentPlan(newTreatmentPlan);
      setIsGenerating(false);
      
      toast({
        title: "Treatment Plan Generated",
        description: "Your personalized treatment plan has been created based on your data.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Disclaimer Alert */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Alert variant="destructive" className="bg-yellow-50 border-yellow-100 text-yellow-800">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Information Only</AlertTitle>
            <AlertDescription>
              Always consult with healthcare professionals for actual medical treatment.
            </AlertDescription>
          </Alert>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold mb-2 font-heading">MediCare AI</h1>
          <p className="text-gray-600 mb-8">Machine learning-driven personalized treatment planning system</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <PatientSummary patient={mockPatient} />
            </div>
            <div>
              <MedicalHistoryPanel medicalHistory={mockMedicalHistory} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div>
              <SymptomSelector 
                selectedSymptoms={selectedSymptoms} 
                setSelectedSymptoms={setSelectedSymptoms} 
              />
            </div>
            <div>
              <ConditionSelector 
                selectedCondition={selectedCondition} 
                setSelectedCondition={setSelectedCondition} 
              />
            </div>
            <div>
              <GeneticProfile geneticProfile={mockGeneticProfile} />
            </div>
          </div>
          
          <div className="flex justify-center mb-8">
            <Button 
              size="lg" 
              onClick={handleGenerateTreatmentPlan} 
              disabled={isGenerating}
              className="px-8 py-6 text-lg bg-teal-600 hover:bg-teal-700 transition-colors hover-scale"
            >
              <Brain className="h-5 w-5 mr-2 animate-pulse-subtle" />
              {isGenerating ? "Generating Plan..." : "Generate Personalized Treatment Plan"}
            </Button>
          </div>
          
          <div className="mb-8">
            <TreatmentPlanView treatmentPlan={treatmentPlan} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
