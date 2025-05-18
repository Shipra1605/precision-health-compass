
import React, { useState, useEffect } from 'react';
import { UserData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Edit3 } from 'lucide-react';

interface PatientInfoCardProps {
  patient: UserData;
  onUpdatePatient: (updatedData: Partial<UserData>) => void;
}

const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ patient, onUpdatePatient }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserData>>({
    fullName: '',
    age: '', // Store as string for input compatibility
    gender: '',
    heightCm: '', // Store as string
    weightKg: '', // Store as string
    existingIllness: '',
    profileImageBase64: '',
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        fullName: patient.fullName || patient.name || '',
        age: patient.age?.toString() || '',
        gender: patient.gender || '',
        heightCm: patient.heightCm?.toString() || '',
        weightKg: patient.weightKg?.toString() || '',
        existingIllness: patient.existingIllness || '',
        profileImageBase64: patient.profileImageBase64 || '',
      });
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImageBase64: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Prepare data for update, converting age, height, weight back if necessary for backend
    // For localStorage, string format is fine based on UserData type adjustments
    const updatePayload: Partial<UserData> = {
      ...formData,
      // Ensure numbers are numbers if your backend expects them, but UserData now expects strings for these.
    };
    onUpdatePatient(updatePayload);
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your information has been saved.',
      className: 'bg-green-500 text-white',
    });
  };

  return (
    <Card className="health-card overflow-hidden relative">
      {/* Decorative Image 2 subtly in the background of the header */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 opacity-10 -z-0"
        style={{
          backgroundImage: `url('/lovable-uploads/f2f4f138-1bc9-4230-92a7-5cb3f25f4908.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top right',
        }}
      />
      <CardHeader className="bg-slate-50/70 dark:bg-slate-800/70 border-b relative z-10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-brand-navy dark:text-brand-pearl-gray-light">Patient Information</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)} className="text-brand-teal hover:text-brand-teal-dark">
            <Edit3 size={18} />
          </Button>
        </div>
        <CardDescription className="text-brand-navy/70 dark:text-brand-pearl-gray-light/70">
          View and manage your personal and medical details.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4 relative z-10">
        {!isEditing ? (
          <div className="space-y-3">
            <div className="flex justify-center mb-4">
              <img 
                src={formData.profileImageBase64 || '/placeholder.svg'} 
                alt={formData.fullName || 'Patient'} 
                className="w-24 h-24 rounded-full object-cover border-2 border-brand-teal shadow-md"
              />
            </div>
            <InfoItem label="Full Name" value={formData.fullName} />
            <InfoItem label="Age" value={formData.age ? `${formData.age} years` : 'N/A'} />
            <InfoItem label="Gender" value={formData.gender} />
            <InfoItem label="Height" value={formData.heightCm ? `${formData.heightCm} cm` : 'N/A'} />
            <InfoItem label="Weight" value={formData.weightKg ? `${formData.weightKg} kg` : 'N/A'} />
            <InfoItem label="Existing Conditions" value={formData.existingIllness || 'None'} wideValue />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="profileImage" className="text-brand-navy/90">Profile Picture</Label>
              <Input id="profileImage" type="file" accept="image/*" onChange={handleImageUpload} className="bg-white/80 focus:bg-white" />
              {formData.profileImageBase64 && <img src={formData.profileImageBase64} alt="Preview" className="mt-2 w-20 h-20 rounded-full object-cover"/>}
            </div>
            <div>
              <Label htmlFor="fullName" className="text-brand-navy/90">Full Name</Label>
              <Input id="fullName" value={formData.fullName} onChange={handleChange} className="bg-white/80 focus:bg-white"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age" className="text-brand-navy/90">Age</Label>
                <Input id="age" type="number" value={formData.age} onChange={handleChange} className="bg-white/80 focus:bg-white"/>
              </div>
              <div>
                <Label htmlFor="gender" className="text-brand-navy/90">Gender</Label>
                <Select onValueChange={(value) => handleSelectChange('gender', value)} value={formData.gender}>
                  <SelectTrigger className="bg-white/80 focus:bg-white"><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="heightCm" className="text-brand-navy/90">Height (cm)</Label>
                <Input id="heightCm" type="number" value={formData.heightCm} onChange={handleChange} className="bg-white/80 focus:bg-white"/>
              </div>
              <div>
                <Label htmlFor="weightKg" className="text-brand-navy/90">Weight (kg)</Label>
                <Input id="weightKg" type="number" value={formData.weightKg} onChange={handleChange} className="bg-white/80 focus:bg-white"/>
              </div>
            </div>
            <div>
              <Label htmlFor="existingIllness" className="text-brand-navy/90">Existing Conditions</Label>
              <Textarea id="existingIllness" value={formData.existingIllness} onChange={handleChange} rows={2} className="bg-white/80 focus:bg-white"/>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSubmit} className="bg-brand-teal hover:bg-brand-teal-dark">Save Changes</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const InfoItem: React.FC<{ label: string; value?: string | number | null; wideValue?: boolean }> = ({ label, value, wideValue }) => (
  <div className={`flex ${wideValue ? 'flex-col items-start sm:flex-row sm:items-center' : 'justify-between items-center'} py-2 border-b border-slate-200/60 dark:border-slate-700/60 last:border-b-0`}>
    <p className="text-sm font-medium text-brand-navy/80 dark:text-brand-pearl-gray-light/80">{label}:</p>
    <p className={`text-sm ${wideValue ? 'mt-1 sm:mt-0 sm:ml-2' : ''} text-brand-navy dark:text-brand-pearl-gray-light text-right`}>{value || 'N/A'}</p>
  </div>
);

export default PatientInfoCard;

