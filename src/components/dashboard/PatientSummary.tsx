
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { User, Activity, Heart, Droplet } from 'lucide-react';
import { Patient } from '@/data/mockData';

interface PatientSummaryProps {
  patient: Patient;
}

const PatientSummary: React.FC<PatientSummaryProps> = ({ patient }) => {
  // Calculate BMI
  const bmi = patient.weight / ((patient.height / 100) * (patient.height / 100));
  const bmiCategory = 
    bmi < 18.5 ? 'Underweight' :
    bmi < 25 ? 'Normal' :
    bmi < 30 ? 'Overweight' : 'Obese';
  
  // For demo purposes, let's create a "health score"
  const healthScore = Math.round(85 - (bmi > 25 ? (bmi - 25) * 2 : 0) + (patient.age < 40 ? 5 : 0));
  
  // Function to determine the progress bar color
  const getProgressClass = (score: number): string => {
    if (score >= 80) return "bg-teal-500";
    if (score >= 60) return "bg-teal-400";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  return (
    <Card className="health-card hover-lift">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium flex items-center gap-2">
          <User className="h-5 w-5 text-teal-600" />
          Patient Summary
        </CardTitle>
        <CardDescription>Basic health metrics and information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center mb-4">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            {patient.profileImage ? (
              <img 
                src={patient.profileImage} 
                alt={`${patient.firstName} ${patient.lastName}`} 
                className="h-24 w-24 rounded-full border-2 border-teal-200"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-teal-100 flex items-center justify-center text-2xl font-bold text-teal-600">
                {patient.firstName[0]}{patient.lastName[0]}
              </div>
            )}
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-xl font-bold">{patient.firstName} {patient.lastName}</h3>
            <div className="text-sm text-gray-500 mb-2">
              {patient.age} years old • {patient.gender} • {patient.height}cm • {patient.weight}kg
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge variant="outline" className="bg-teal-50">
                <Droplet className="h-3 w-3 mr-1 text-teal-600" />
                {patient.bloodType}
              </Badge>
              {patient.allergies.map((allergy, index) => (
                <Badge key={index} variant="secondary" className="bg-teal-100 text-teal-800">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="health-stat bg-teal-50 hover-scale">
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Activity className="h-3 w-3 text-teal-600" /> BMI
            </div>
            <div className="text-xl font-semibold">{bmi.toFixed(1)}</div>
            <div className="text-sm">{bmiCategory}</div>
          </div>
          
          <div className="health-stat bg-teal-50 hover-scale">
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Heart className="h-3 w-3 text-teal-600" /> Health Score
            </div>
            <div className="text-xl font-semibold">{healthScore}/100</div>
            <Progress 
              value={healthScore} 
              className={`h-2 mt-1 ${getProgressClass(healthScore)}`}
            />
          </div>
          
          <div className="health-stat bg-teal-50 hover-scale">
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Activity className="h-3 w-3 text-teal-600" /> Risk Profile
            </div>
            <div className="text-xl font-semibold">
              {
                healthScore >= 80 ? "Low" : 
                healthScore >= 60 ? "Moderate" : 
                "Elevated"
              }
            </div>
            <div className="text-sm text-gray-500">Based on current metrics</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientSummary;
