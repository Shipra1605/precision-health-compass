
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Edit3, UploadCloud } from 'lucide-react';
import { UserData } from '@/types'; // Use UserData from centralized types
import { useToast } from '@/components/ui/use-toast';

interface PatientInfoCardProps {
  patient: UserData | null;
  onUpdatePatient: (updatedPatientData: Partial<UserData>) => void; // Callback to update parent state
}

const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ patient, onUpdatePatient }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getUserInitials = (): string => {
    if (!patient || !patient.fullName) { // Use fullName for initials
      return patient?.name ? patient.name.substring(0, 1).toUpperCase() : "?";
    }
    const nameParts = patient.fullName.split(' ');
    return nameParts
      .map(part => part[0]?.toUpperCase() || '')
      .filter(Boolean)
      .slice(0, 2) // Max 2 initials
      .join('');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && patient) {
      if (file.size > 2 * 1024 * 1024) { // Max 2MB
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 2MB.",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedUser = { ...patient, profileImageBase64: base64String };
        
        // Update localStorage 'currentUser'
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Update 'registeredUsers' for persistence across sessions
        const registeredUsersString = localStorage.getItem('registeredUsers');
        let registeredUsers: UserData[] = registeredUsersString ? JSON.parse(registeredUsersString) : [];
        const userIndex = registeredUsers.findIndex(u => u.id === patient.id);
        if (userIndex !== -1) {
          registeredUsers[userIndex].profileImageBase64 = base64String;
          localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        }

        onUpdatePatient({ profileImageBase64: base64String }); // Update parent state
        toast({
          title: "Profile Picture Updated",
          description: "Your new picture has been saved.",
        });
      };
      reader.readAsDataURL(file);
    }
    // Clear file input value to allow re-uploading the same file
    if (event.target) {
      event.target.value = '';
    }
  };

  if (!patient) {
    return (
      <Card className="glass-panel">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-heading flex items-center gap-2">
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
      <CardHeader className="pb-4"> {/* Increased padding bottom */}
        <CardTitle className="text-xl font-heading flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-medical-primary" />
            Patient Profile
          </div>
          {/* <Button variant="ghost" size="sm" className="text-medical-primary hover:text-medical-accent">
            <Edit3 className="h-4 w-4 mr-1" /> Edit
          </Button> */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6"> {/* Increased spacing */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative group">
              {patient.profileImageBase64 ? (
                <img 
                  src={patient.profileImageBase64} 
                  alt={patient.fullName || patient.name}
                  className="h-24 w-24 rounded-full border-2 border-medical-light object-cover shadow-md"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-medical-light flex items-center justify-center text-3xl font-bold text-medical-primary shadow-md">
                  {getUserInitials()}
                </div>
              )}
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white group-hover:opacity-100 opacity-70 transition-opacity border-medical-primary"
                onClick={() => fileInputRef.current?.click()}
                title="Upload profile picture"
              >
                <UploadCloud className="h-4 w-4 text-medical-primary" />
              </Button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/png, image/jpeg, image/gif" 
                className="hidden" 
              />
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold font-heading">{patient.fullName || patient.name}</div>
              <div className="text-sm text-gray-500">{patient.email}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <div className="text-gray-500 mb-0.5">Age</div>
              <div className="font-medium">{patient.age || "N/A"} years</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Gender</div>
              <div className="font-medium">{patient.gender || "N/A"}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Height</div>
              <div className="font-medium">{patient.heightCm ? `${patient.heightCm} cm` : "N/A"}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Weight</div>
              <div className="font-medium">{patient.weightKg ? `${patient.weightKg} kg` : "N/A"}</div>
            </div>
          </div>
          
          {(patient.existingIllness && patient.existingIllness.toLowerCase() !== 'none' && patient.existingIllness.trim() !== '') && (
            <div>
              <div className="text-sm text-gray-500 mb-0.5">Existing Conditions</div>
              <div className="font-medium p-3 bg-medical-background/30 rounded-md text-sm">
                {patient.existingIllness.split(',').map(illness => illness.trim()).filter(Boolean).map((illness, index) => (
                    <span key={index} className="inline-block bg-medical-light/70 text-medical-primary px-2 py-0.5 rounded-full text-xs mr-1.5 mb-1.5">{illness}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientInfoCard;
