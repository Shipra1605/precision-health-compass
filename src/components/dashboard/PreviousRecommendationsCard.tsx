import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { Recommendation } from '@/types'; // Updated to import from centralized types

interface PreviousRecommendationsCardProps {
  recommendations: Recommendation[];
  onViewRecommendation: (rec: Recommendation) => void;
}

const PreviousRecommendationsCard: React.FC<PreviousRecommendationsCardProps> = ({ recommendations, onViewRecommendation }) => {
  const sortedRecommendations = [...recommendations].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 font-heading">
          <History className="h-5 w-5 text-medical-primary" />
          Previous Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedRecommendations.length > 0 ? (
          <ul className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {sortedRecommendations.slice(0, 5).map((rec) => (
              <li key={rec.id} className="p-3 border rounded-md bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Symptoms: {rec.symptoms.substring(0, 30)}{rec.symptoms.length > 30 ? '...' : ''}
                    </p>
                    <p className="text-xs text-gray-500">{new Date(rec.date).toLocaleDateString()}</p>
                  </div>
                  <Button variant="link" size="sm" onClick={() => onViewRecommendation(rec)} className="text-medical-primary hover:text-medical-accent p-0 h-auto self-center">
                    View
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No previous recommendations.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PreviousRecommendationsCard;
