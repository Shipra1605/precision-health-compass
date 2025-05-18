
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { Recommendation } from '@/types';

interface PreviousRecommendationsCardProps {
  recommendations: Recommendation[];
  onViewRecommendation: (rec: Recommendation) => void;
}

const PreviousRecommendationsCard: React.FC<PreviousRecommendationsCardProps> = ({ recommendations, onViewRecommendation }) => {
  const sortedRecommendations = [...recommendations].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (sortedRecommendations.length === 0) { // Conditional rendering if no recommendations
    return null; // Or a placeholder card if preferred
  }

  return (
    <Card className="professional-card"> {/* Using new professional-card style */}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 professional-heading text-gray-700">
          <History className="h-5 w-5 text-medical-primary" />
          Previous Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 max-h-72 overflow-y-auto pr-1"> {/* Increased max-h */}
          {sortedRecommendations.slice(0, 5).map((rec) => ( // Show latest 5
            <li key={rec.id} className="p-3 border rounded-md bg-slate-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Symptoms: {rec.symptoms.substring(0, 40)}{rec.symptoms.length > 40 ? '...' : ''}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(rec.date).toLocaleDateString()} - {new Date(rec.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <Button variant="link" size="sm" onClick={() => onViewRecommendation(rec)} className="text-medical-primary hover:text-medical-accent p-0 h-auto self-center">
                  View Details
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PreviousRecommendationsCard;
