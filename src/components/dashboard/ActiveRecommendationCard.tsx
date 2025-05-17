
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, CheckCircle, BarChart3 } from 'lucide-react'; // BarChart3 for confidence
import { Recommendation } from '@/pages/Dashboard'; // Assuming type is exported from Dashboard
import { Progress } from "@/components/ui/progress";


interface ActiveRecommendationCardProps {
  recommendation: Recommendation | null;
}

const ActiveRecommendationCard: React.FC<ActiveRecommendationCardProps> = ({ recommendation }) => {
  if (!recommendation) {
    return (
      <Card className="glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-medical-primary" />
            Active Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="mx-auto h-12 w-12 text-green-400 mb-2" />
            No active recommendation. Analyze symptoms to get one.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <ScrollText className="h-5 w-5 text-medical-primary" />
          Active Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Date:</h3>
            <p>{new Date(recommendation.date).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Symptoms Reported:</h3>
            <p className="text-gray-700 bg-gray-50 p-2 rounded-md">{recommendation.symptoms}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Recommendation:</h3>
            <p className="text-gray-700 bg-blue-50 p-3 rounded-md border border-blue-200">{recommendation.recommendation}</p>
          </div>
          <div>
             <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-1 text-medical-primary" />
                    Confidence Score:
                </h3>
                <span className="text-sm font-semibold text-medical-primary">{recommendation.confidenceScore}%</span>
            </div>
            <Progress value={recommendation.confidenceScore} className="w-full h-2 [&>div]:bg-medical-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveRecommendationCard;
