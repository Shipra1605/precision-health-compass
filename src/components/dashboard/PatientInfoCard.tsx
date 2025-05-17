
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { UserData } from '@/pages/Dashboard'; // Assuming UserData is exported from Dashboard or a types file

interface PatientInfoCardProps {
  patient: UserData | null;
}

const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ patient }) => {
  const getUserInitials = (): string => {
    if (!patient || typeof patient.fullName !== 'string' || !patient.fullName.trim()) {
      return "?";
    }
    const nameParts = patient.fullName.split(' ');
    return nameParts
      .map(part => part[0]?.toUpperCase() || '')
      .filter(Boolean) // Remove any empty strings that might result from multiple spaces
      .join('');
  };

  if (!patient) {
    return (
      <Card className="glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-medical-primary" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-gray-500">Loading patient data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5 text-medical-primary" />
          Patient Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-medical-light flex items-center justify-center text-xl font-bold text-medical-primary">
              {getUserInitials()}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Full Name</div>
            <div className="font-medium">{patient.fullName}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Age</div>
              <div className="font-medium">{patient.age} years</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Gender</div>
              <div className="font-medium">{patient.gender}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Height</div>
              <div className="font-medium">{patient.height} cm</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Weight</div>
              <div className="font-medium">{patient.weight} kg</div>
            </div>
          </div>
          
          {patient.existingIllness && patient.existingIllness !== 'none' && (
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Existing Illness</div>
              <div className="font-medium">{patient.existingIllness}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientInfoCard;
