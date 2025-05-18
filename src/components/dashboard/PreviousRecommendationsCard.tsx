
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Added CardDescription
import { Button } from '@/components/ui/button';
import { History, FileText } from 'lucide-react'; // Added FileText for empty state
import { Recommendation } from '@/types';

interface PreviousRecommendationsCardProps {
  recommendations: Recommendation[];
  onViewRecommendation: (rec: Recommendation) => void;
}

const PreviousRecommendationsCard: React.FC<PreviousRecommendationsCardProps> = ({ recommendations, onViewRecommendation }) => {
  const sortedRecommendations = [...recommendations].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (sortedRecommendations.length === 0) {
    return (
        <Card className="professional-card">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2 professional-heading text-brand-navy">
                    <History className="h-5 w-5 text-brand-teal" />
                    Previous Recommendations
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center py-6 text-brand-navy/60">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No previous recommendations found.</p>
                    <p className="text-xs mt-1">Your past AI-generated advice will appear here.</p>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="professional-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2 professional-heading text-brand-navy">
          <History className="h-5 w-5 text-brand-teal" />
          Previous Recommendations
        </CardTitle>
        <CardDescription className="text-sm text-brand-navy/70 pt-1">
          Review your past AI-generated health advice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar"> {/* Increased max-h, added custom-scrollbar class if needed */}
          {sortedRecommendations.slice(0, 5).map((rec) => (
            <li key={rec.id} className="p-3.5 border border-border/50 rounded-lg bg-slate-50 dark:bg-neutral-700/30 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-brand-navy/90 mb-1 leading-snug">
                    Symptoms: {rec.symptoms.length > 50 ? `${rec.symptoms.substring(0, 50)}...` : rec.symptoms}
                  </p>
                  <p className="text-xs text-brand-navy/60">
                    {new Date(rec.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} - {new Date(rec.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => onViewRecommendation(rec)} 
                    className="text-brand-teal hover:text-brand-teal-dark p-0 h-auto self-center text-sm whitespace-nowrap hover:underline"
                >
                  View Details
                </Button>
              </div>
            </li>
          ))}
        </ul>
        {sortedRecommendations.length > 5 && (
            <p className="text-xs text-center text-brand-navy/60 mt-3">Showing latest 5 recommendations.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PreviousRecommendationsCard;

