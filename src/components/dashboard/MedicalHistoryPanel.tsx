
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, Pill, Stethoscope, Users } from 'lucide-react';
import { MedicalHistory } from '@/data/mockData';

interface MedicalHistoryPanelProps {
  medicalHistory: MedicalHistory;
}

const MedicalHistoryPanel: React.FC<MedicalHistoryPanelProps> = ({ medicalHistory }) => {
  return (
    <Card className="health-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-medical-primary" />
          Medical History
        </CardTitle>
        <CardDescription>Patient's conditions, medications, and more</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="conditions" className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="conditions" className="flex items-center gap-1">
              <Stethoscope className="h-4 w-4" />
              Conditions
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center gap-1">
              <Pill className="h-4 w-4" />
              Medications
            </TabsTrigger>
            <TabsTrigger value="family" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Family History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="conditions">
            <div className="space-y-4">
              {medicalHistory.conditions.map((condition, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{condition.name}</h4>
                    <Badge 
                      variant={
                        condition.status === 'active' ? 'default' : 
                        condition.status === 'in-remission' ? 'secondary' : 
                        'outline'
                      }
                    >
                      {condition.status === 'active' ? 'Active' : 
                       condition.status === 'in-remission' ? 'In Remission' : 
                       'Resolved'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    Diagnosed: {new Date(condition.diagnosedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              ))}
              {medicalHistory.conditions.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No conditions recorded
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="medications">
            <div className="space-y-4">
              {medicalHistory.medications.map((medication, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                  <h4 className="font-medium">{medication.name}</h4>
                  <div className="text-sm text-gray-500">
                    {medication.dosage}, {medication.frequency}
                  </div>
                  <div className="text-sm text-gray-500">
                    Started: {new Date(medication.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    {medication.endDate && ` • Ended: ${new Date(medication.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`}
                  </div>
                </div>
              ))}
              {medicalHistory.medications.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No medications recorded
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="family">
            <div className="space-y-4">
              {medicalHistory.familyHistory.map((item, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                  <h4 className="font-medium">{item.condition}</h4>
                  <div className="text-sm text-gray-500">
                    Relation: {item.relation}
                  </div>
                </div>
              ))}
              {medicalHistory.familyHistory.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No family history recorded
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MedicalHistoryPanel;
