
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, CheckCircle, BarChart3, Lightbulb } from 'lucide-react'; // Added Lightbulb
import { Recommendation } from '@/types';
import { Progress } from "@/components/ui/progress";

interface ActiveRecommendationCardProps {
  recommendation: Recommendation | null;
}

const ActiveRecommendationCard: React.FC<ActiveRecommendationCardProps> = ({ recommendation }) => {
  return (
    <Card className="professional-card min-h-[300px]"> {/* Using new professional-card style & min-height */}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 professional-heading text-gray-700">
          <Lightbulb className="h-5 w-5 text-medical-primary" /> {/* Changed icon and title */}
          Get Your Personalized Medical Treatment
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recommendation ? (
          <div className="space-y-4 animate-fade-in">
            <div>
              <p className="text-sm text-gray-500 mb-1">Based on symptoms: <span className="font-medium text-gray-700">{recommendation.symptoms}</span></p>
              <p className="text-xs text-gray-400">Generated: {new Date(recommendation.date).toLocaleString()}</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-1 flex items-center gap-2">
                <ScrollText className="h-5 w-5" /> Recommended Action:
              </h4>
              <p className="text-gray-700">{recommendation.recommendation}</p>
            </div>
            {recommendation.confidenceScore && (
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                    <BarChart3 className="h-4 w-4"/> Confidence Score
                  </span>
                  <span className="text-sm font-semibold text-medical-primary">{recommendation.confidenceScore}%</span>
                </div>
                <Progress value={recommendation.confidenceScore} className="h-2 [&>div]:bg-medical-primary" />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-md">Your personalized treatment insights will appear here after analyzing your symptoms or new medical records.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveRecommendationCard;
