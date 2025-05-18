import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, UploadCloud, Edit3 } from 'lucide-react';
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
        onUpdatePatient({ profileImageBase64: base64String }); 
        
        const currentUserString = localStorage.getItem('currentUser');
        if (currentUserString) {
            const currentUserData = JSON.parse(currentUserString);
            const updatedCurrentUser = { ...currentUserData, profileImageBase64: base64String };
            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
        }

        if (registeredUsersString && patient.id) { // Ensure patient.id exists
            let registeredUsers: UserData[] = JSON.parse(registeredUsersString);
            const userIndex = registeredUsers.findIndex(u => u.id === patient.id); // Use patient.id
            if (userIndex !== -1) {
              // Create a new object for the updated user to avoid direct mutation of patient prop
              const updatedRegisteredUser = { ...registeredUsers[userIndex], ...patient, profileImageBase64: base64String };
              registeredUsers[userIndex] = updatedRegisteredUser;
              localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            }
        }
        
        toast({
          title: "Profile Picture Updated",
          description: "Your new picture has been saved.",
          className: "bg-brand-teal text-white"
        });
      };
      reader.readAsDataURL(file);
    }
    if (event.target) {
      event.target.value = '';
    }
  };
  const registeredUsersString = localStorage.getItem('registeredUsers');

  if (!patient) {
    return (
      <Card className="professional-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2 professional-heading text-brand-navy">
            <User className="h-5 w-5 text-brand-teal" />
            Patient Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-brand-navy/60">Loading patient data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="professional-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2 professional-heading text-brand-navy">
                <User className="h-6 w-6 text-brand-teal" />
                Patient Profile
            </CardTitle>
            {/* Optional: Edit Profile Button
            <Link to="/profile-setup"> // Or a dedicated edit profile page
                <Button variant="outline" size="sm" className="text-xs border-brand-teal/50 text-brand-teal hover:bg-brand-teal/10">
                    <Edit3 className="h-3 w-3 mr-1.5" /> Edit
                </Button>
            </Link>
            */}
        </div>
        <CardDescription className="text-sm text-brand-navy/70 pt-1">
            Your personal health summary.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative group">
              {patient.profileImageBase64 ? (
                <img 
                  src={patient.profileImageBase64} 
                  alt={patient.fullName || patient.name}
                  className="h-28 w-28 rounded-full border-4 border-white dark:border-neutral-700 object-cover shadow-lg" // Enhanced style
                />
              ) : (
                <div className="h-28 w-28 rounded-full bg-gradient-to-br from-brand-teal/20 to-brand-blue-sky/20 flex items-center justify-center text-4xl font-bold text-brand-teal shadow-lg border-4 border-white dark:border-neutral-700">
                  {getUserInitials()}
                </div>
              )}
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-1 right-1 rounded-full h-9 w-9 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm group-hover:opacity-100 opacity-80 transition-opacity border-border hover:bg-white dark:hover:bg-neutral-700 shadow-md"
                onClick={() => fileInputRef.current?.click()}
                title="Upload profile picture"
              >
                <UploadCloud className="h-4.5 w-4.5 text-brand-teal" />
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
              <div className="text-2xl font-semibold font-heading text-brand-navy">{patient.fullName || patient.name}</div>
              <div className="text-sm text-brand-navy/70">{patient.email}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm border-t border-border pt-5 mt-3">
            {[
              { label: "Age", value: patient.age ? `${patient.age} years` : "N/A" },
              { label: "Gender", value: patient.gender || "N/A" },
              { label: "Height", value: patient.heightCm ? `${patient.heightCm} cm` : "N/A" },
              { label: "Weight", value: patient.weightKg ? `${patient.weightKg} kg` : "N/A" },
            ].map(item => (
              <div key={item.label}>
                <div className="text-xs text-brand-navy/60 mb-0.5 uppercase tracking-wider">{item.label}</div>
                <div className="font-medium text-brand-navy/90">{item.value}</div>
              </div>
            ))}
          </div>
          
          {(patient.existingIllness && patient.existingIllness.toLowerCase() !== 'none' && patient.existingIllness.trim() !== '') && (
            <div className="border-t border-border pt-5 mt-1">
              <div className="text-xs text-brand-navy/60 mb-1.5 uppercase tracking-wider">Existing Conditions</div>
              <div className="flex flex-wrap gap-2">
                {patient.existingIllness.split(',').map(illness => illness.trim()).filter(Boolean).map((illness, index) => (
                    <span key={index} className="inline-block bg-brand-teal/10 text-brand-teal-dark px-2.5 py-1 rounded-full text-xs font-medium">
                        {illness}
                    </span>
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
