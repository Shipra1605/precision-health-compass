
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, FileText } from 'lucide-react';
import { UserData, MedicalRecord } from '@/pages/Dashboard'; // Assuming types are exported from Dashboard

interface MedicalRecordsCardProps {
  user: UserData | null;
  medicalRecords: MedicalRecord[];
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MedicalRecordsCard: React.FC<MedicalRecordsCardProps> = ({ user, medicalRecords, onFileUpload }) => {
  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-medical-primary" />
          Medical Records
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="file-upload" className="sr-only">
              Upload Medical Record
            </label>
            <Input
              id="file-upload"
              type="file"
              onChange={onFileUpload}
              className="mb-2"
              accept=".pdf,.jpg,.png,.doc,.docx" // Specify acceptable file types
            />
            <Button onClick={() => document.getElementById('file-upload')?.click()} className="w-full" variant="outline">
              <UploadCloud className="mr-2 h-4 w-4" />
              Upload Record
            </Button>
          </div>
          {medicalRecords.length > 0 ? (
            <ul className="space-y-2">
              {medicalRecords.map((record) => (
                <li key={record.id} className="flex justify-between items-center p-2 border rounded-md bg-gray-50">
                  <span className="text-sm">{record.name}</span>
                  <span className="text-xs text-gray-500">{new Date(record.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 text-center">No medical records uploaded yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordsCard;
