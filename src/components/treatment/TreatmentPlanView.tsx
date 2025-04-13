
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clipboard, Pill, Activity, Calendar, FileText } from 'lucide-react';
import { TreatmentPlan } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface TreatmentPlanViewProps {
  treatmentPlan: TreatmentPlan | null;
}

const TreatmentPlanView: React.FC<TreatmentPlanViewProps> = ({ treatmentPlan }) => {
  if (!treatmentPlan) {
    return (
      <Card className="health-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium flex items-center gap-2">
            <Clipboard className="h-5 w-5 text-medical-primary" />
            Treatment Plan
          </CardTitle>
          <CardDescription>Generate a plan to see results here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No Treatment Plan Generated</h3>
            <p className="max-w-md mx-auto">
              Add symptoms and select a condition, then generate a personalized treatment plan.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="health-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-medium flex items-center gap-2">
              <Clipboard className="h-5 w-5 text-medical-primary" />
              Personalized Treatment Plan
            </CardTitle>
            <CardDescription>
              Generated on {new Date(treatmentPlan.date).toLocaleDateString('en-US', { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}
            </CardDescription>
          </div>
          <Badge className="bg-medical-primary">
            {treatmentPlan.precisionScore}% Precision Score
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{treatmentPlan.primaryCondition}</h3>
            <p className="text-gray-600">{treatmentPlan.notes}</p>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-md font-medium mb-3 flex items-center gap-2">
              <Pill className="h-4 w-4 text-medical-primary" />
              Recommended Medications
            </h4>
            
            <div className="space-y-4">
              {treatmentPlan.recommendedMedications.map((med, index) => (
                <div key={index} className="bg-medical-light/10 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h5 className="font-semibold">{med.name}</h5>
                    <Badge variant="outline">
                      {med.effectiveness}% Effective
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600 mt-1">
                    {med.dosage}, {med.frequency}, for {med.duration}
                  </div>
                  
                  <div className="text-sm mt-2">
                    <span className="font-medium">Purpose:</span> {med.purpose}
                  </div>
                  
                  <div className="mt-3">
                    <div className="text-xs text-gray-500 mb-1">Confidence Score</div>
                    <div className="flex items-center gap-2">
                      <Progress value={med.confidenceScore} className="h-2 flex-grow" />
                      <span className="text-xs font-semibold">{med.confidenceScore}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <span className="text-xs text-gray-500">Potential side effects:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {med.potentialSideEffects.map((effect, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {effect}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-md font-medium mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-medical-primary" />
              Recommended Lifestyle Changes
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {treatmentPlan.lifestyleChanges.map((change, index) => (
                <div key={index} className="bg-medical-light/10 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold capitalize">{change.category}</h5>
                    <Badge variant="outline">
                      Importance: {change.importance}/10
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{change.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-md font-medium mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-medical-primary" />
              Follow-up Recommendations
            </h4>
            
            <div className="bg-medical-light/10 rounded-lg p-4">
              <div className="flex justify-between items-start mb-1">
                <h5 className="font-semibold">Next Follow-up</h5>
                <Badge>
                  {treatmentPlan.followUpRecommendation.timeframe}
                </Badge>
              </div>
              
              {treatmentPlan.followUpRecommendation.specialist && (
                <div className="text-sm mt-2">
                  <span className="font-medium">Specialist:</span> {treatmentPlan.followUpRecommendation.specialist}
                </div>
              )}
              
              {treatmentPlan.followUpRecommendation.tests && treatmentPlan.followUpRecommendation.tests.length > 0 && (
                <div className="mt-3">
                  <span className="text-sm font-medium">Recommended Tests:</span>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                    {treatmentPlan.followUpRecommendation.tests.map((test, idx) => (
                      <li key={idx}>{test}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentPlanView;
