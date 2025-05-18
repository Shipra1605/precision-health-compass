export interface UserData {
  id: string;
  name?: string; // Kept optional as per original, can be filled from fullName
  fullName?: string; // Primary field for user's full name
  email: string;
  password?: string; // Password might not always be exposed/needed on client
  age?: string; // Changed from number to string to match form data
  gender?: string;
  heightCm?: string; // Changed from number to string
  weightKg?: string; // Changed from number to string
  existingIllness?: string;
  profileImageBase64?: string; // For user's profile picture
  
  // Added based on usage in components like Login, ProfileSetup, Dashboard
  needsProfileSetup?: boolean; 
  sessionExpiry?: string;
}

export interface MedicalRecord {
  id: string;
  name: string;
  date: Date;
  // fileUrl?: string; // Optional: if storing a link to the actual file
  // notes?: string;   // Optional: any additional notes for the record
}

export interface Recommendation {
  id: string;
  date: Date;
  symptoms: string;
  recommendation: string;
  confidenceScore?: number; // e.g., 0-100
  // doctorNotes?: string;   // Optional: notes from AI or a doctor
  // followUpRequired?: boolean; // Optional: flag for follow-up
}
