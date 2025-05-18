
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, FileText, Trash2 } from 'lucide-react'; // Added Trash2
import { UserData, MedicalRecord } from '@/types';

interface MedicalRecordsCardProps {
  user: UserData | null;
  medicalRecords: MedicalRecord[];
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteRecord: (recordId: string) => void; // New prop for deleting
}

const MedicalRecordsCard: React.FC<MedicalRecordsCardProps> = ({ user, medicalRecords, onFileUpload, onDeleteRecord }) => {
  return (
    <Card className="professional-card"> {/* Using new professional-card style */}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 professional-heading text-gray-700">
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
            {/* The actual input is hidden, button triggers click */}
            <Input
              id="file-upload"
              type="file"
              onChange={onFileUpload}
              className="hidden" // Hidden
              accept=".pdf,.jpg,.png,.doc,.docx"
            />
            <Button onClick={() => document.getElementById('file-upload')?.click()} className="w-full" variant="outline">
              <UploadCloud className="mr-2 h-4 w-4" />
              Upload New Record
            </Button>
          </div>
          {medicalRecords.length > 0 ? (
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-1"> {/* Added max-h and overflow */}
              {medicalRecords.map((record) => (
                <li key={record.id} className="flex justify-between items-center p-3 border rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{record.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{new Date(record.date).toLocaleDateString()}</span>
                    <Button variant="ghost" size="icon" onClick={() => onDeleteRecord(record.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 h-7 w-7">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No medical records uploaded yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordsCard;
