
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Added CardDescription
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
    <Card className="professional-card">
      <CardHeader className="pb-3"> {/* Adjusted padding */}
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2 professional-heading text-brand-navy">
            <Search className="h-5 w-5 text-brand-teal" />
            Symptom Analysis
          </CardTitle>
          {/* Optional: Add a small info icon/tooltip here if needed */}
        </div>
        <CardDescription className="text-sm text-brand-navy/70 pt-1">
           Please describe your current health symptoms or conditions you're experiencing today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="e.g., Persistent cough and mild fever for 2 days, feeling fatigued, occasional headache..."
            value={symptoms}
            onChange={(e) => onSymptomsChange(e.target.value)}
            rows={5} // Slightly reduced rows
            className="resize-none bg-white/90 dark:bg-neutral-700/50 border-border focus:bg-white dark:focus:bg-neutral-700 focus:border-brand-teal text-sm"
            disabled={isAnalyzing}
          />
          <Button 
            onClick={onSubmit} 
            disabled={isAnalyzing || !symptoms.trim()} 
            className="w-full bg-gradient-to-r from-brand-teal to-brand-blue-sky hover:from-brand-teal-dark hover:to-brand-teal text-white py-3 text-base shadow-md hover:shadow-lg transition-all"
          >
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

