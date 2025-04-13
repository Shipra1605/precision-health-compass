
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dna } from 'lucide-react';
import { GeneticProfile as GeneticProfileType } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

interface GeneticProfileProps {
  geneticProfile: GeneticProfileType;
}

const GeneticProfile: React.FC<GeneticProfileProps> = ({ geneticProfile }) => {
  return (
    <Card className="health-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium flex items-center gap-2">
          <Dna className="h-5 w-5 text-medical-primary" />
          Genetic Profile
        </CardTitle>
        <CardDescription>Genetic factors influencing treatment decisions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Key Genetic Markers</h4>
            <div className="space-y-3">
              {geneticProfile.markers.map((marker, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex justify-between">
                    <span className="font-medium">{marker.name}</span>
                    <Badge 
                      variant={
                        marker.risk === 'low' ? 'outline' : 
                        marker.risk === 'moderate' ? 'secondary' : 
                        'destructive'
                      }
                    >
                      {marker.risk.charAt(0).toUpperCase() + marker.risk.slice(1)} Risk
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {marker.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {marker.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Ancestry Composition</h4>
            <div className="space-y-3">
              {Object.entries(geneticProfile.ancestry)
                .sort(([, a], [, b]) => b - a)
                .map(([ancestry, percentage], index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{ancestry}</span>
                      <span>{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Medication Response Factors</h4>
            <div className="space-y-3">
              {geneticProfile.responseFactors.map((factor, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="font-medium">{factor.medication}</div>
                  <div className="flex gap-3 mt-1">
                    <Badge 
                      variant="outline" 
                      className={
                        factor.effectiveness === 'high' 
                          ? 'border-green-200 bg-green-50 text-green-700' 
                          : factor.effectiveness === 'moderate'
                          ? 'border-blue-200 bg-blue-50 text-blue-700'
                          : 'border-yellow-200 bg-yellow-50 text-yellow-700'
                      }
                    >
                      {factor.effectiveness.charAt(0).toUpperCase() + factor.effectiveness.slice(1)} Effectiveness
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={
                        factor.sideEffectRisk === 'low' 
                          ? 'border-green-200 bg-green-50 text-green-700' 
                          : factor.sideEffectRisk === 'moderate'
                          ? 'border-yellow-200 bg-yellow-50 text-yellow-700'
                          : 'border-red-200 bg-red-50 text-red-700'
                      }
                    >
                      {factor.sideEffectRisk.charAt(0).toUpperCase() + factor.sideEffectRisk.slice(1)} Side Effect Risk
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneticProfile;
