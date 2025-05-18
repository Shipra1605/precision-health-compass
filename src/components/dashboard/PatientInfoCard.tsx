import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, UploadCloud } from 'lucide-react';
import { UserData } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface PatientInfoCardProps {
  patient: UserData | null;
  onUpdatePatient: (updatedPatientData: Partial<UserData>) => void;
}

const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ patient, onUpdatePatient }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getUserInitials = (): string => {
    if (!patient || !patient.fullName) {
      return patient?.name ? patient.name.substring(0, 1).toUpperCase() : "?";
    }
    const nameParts = patient.fullName.split(' ');
    return nameParts
      .map(part => part[0]?.toUpperCase() || '')
      .filter(Boolean)
      .slice(0, 2)
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
        // Optimistically update UI via onUpdatePatient, which updates parent state `user`
        // This change will propagate back to this component via props.
        onUpdatePatient({ profileImageBase64: base64String }); 
        
        // Update localStorage 'currentUser' to persist across refreshes
        const currentUserString = localStorage.getItem('currentUser');
        if (currentUserString) {
            const currentUserData = JSON.parse(currentUserString);
            const updatedCurrentUser = { ...currentUserData, profileImageBase64: base64String };
            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
        }

        // Update 'registeredUsers' for persistence across sessions for this specific user
        const registeredUsersString = localStorage.getItem('registeredUsers');
        if (registeredUsersString && patient.id) {
            let registeredUsers: UserData[] = JSON.parse(registeredUsersString);
            const userIndex = registeredUsers.findIndex(u => u.id === patient.id);
            if (userIndex !== -1) {
              registeredUsers[userIndex].profileImageBase64 = base64String;
              // Also update other fields if they were changed and persisted via onUpdatePatient
              registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...patient, profileImageBase64: base64String }; 
              localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            }
        }
        
        toast({
          title: "Profile Picture Updated",
          description: "Your new picture has been saved.",
        });
      };
      reader.readAsDataURL(file);
    }
    if (event.target) {
      event.target.value = '';
    }
  };

  if (!patient) {
    return (
      <Card className="professional-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-heading flex items-center gap-2 professional-heading text-gray-700">
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
    <Card className="professional-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-heading flex items-center gap-2 justify-between professional-heading text-gray-700">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-medical-primary" />
            Patient Profile
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative group">
              {patient.profileImageBase64 ? (
                <img 
                  src={patient.profileImageBase64} 
                  alt={patient.fullName || patient.name}
                  className="h-24 w-24 rounded-full border-2 border-medical-light object-cover shadow-md"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center text-3xl font-bold text-medical-primary shadow-md">
                  {getUserInitials()}
                </div>
              )}
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white/80 backdrop-blur-sm group-hover:opacity-100 opacity-70 transition-opacity border-medical-primary/50 hover:bg-white"
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
              <div className="text-xl font-semibold font-heading text-gray-700">{patient.fullName || patient.name}</div>
              <div className="text-sm text-gray-500">{patient.email}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div>
              <div className="text-gray-500 mb-0.5">Age</div>
              <div className="font-medium text-gray-700">{patient.age || "N/A"} years</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Gender</div>
              <div className="font-medium text-gray-700">{patient.gender || "N/A"}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Height</div>
              <div className="font-medium text-gray-700">{patient.heightCm ? `${patient.heightCm} cm` : "N/A"}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-0.5">Weight</div>
              <div className="font-medium text-gray-700">{patient.weightKg ? `${patient.weightKg} kg` : "N/A"}</div>
            </div>
          </div>
          
          {(patient.existingIllness && patient.existingIllness.toLowerCase() !== 'none' && patient.existingIllness.trim() !== '') && (
            <div>
              <div className="text-sm text-gray-500 mb-1">Existing Conditions</div>
              <div className="font-medium p-3 bg-slate-50 rounded-md text-sm border border-slate-200">
                {patient.existingIllness.split(',').map(illness => illness.trim()).filter(Boolean).map((illness, index) => (
                    <span key={index} className="inline-block bg-teal-100/70 text-teal-700 px-2 py-0.5 rounded-full text-xs mr-1.5 mb-1.5">{illness}</span>
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
