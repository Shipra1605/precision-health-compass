
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Search, Zap } from 'lucide-react';

interface SymptomAnalysisCardProps {
  symptoms: string;
  onSymptomsChange: (symptoms: string) => void;
  onSubmit: () => void;
  isAnalyzing: boolean;
}

const SymptomAnalysisCard: React.FC<SymptomAnalysisCardProps> = ({ symptoms, onSymptomsChange, onSubmit, isAnalyzing }) => {
  return (
    <Card className="professional-card"> {/* Using new professional-card style */}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 professional-heading text-gray-700">
          <Search className="h-5 w-5 text-medical-primary" />
          Symptom Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Describe your current symptoms or health conditions you're facing (e.g., persistent cough and mild fever for 2 days, feeling fatigued)..."
            value={symptoms}
            onChange={(e) => onSymptomsChange(e.target.value)}
            rows={6}
            className="resize-none bg-white/80 focus:bg-white"
            disabled={isAnalyzing}
          />
          <Button onClick={onSubmit} disabled={isAnalyzing || !symptoms.trim()} className="w-full bg-medical-primary hover:bg-medical-primary/90 text-white py-3">
            {isAnalyzing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Analyze My Symptoms
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SymptomAnalysisCard;
