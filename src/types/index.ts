
export interface UserData {
  id: string;
  name: string; // Initial name from signup
  email: string;
  password?: string; // Stored in registeredUsers, not in currentUser session for security
  fullName?: string; // From profile setup
  age?: string;
  gender?: string;
  heightCm?: string;
  weightKg?: string;
  existingIllness?: string;
  profileImageBase64?: string; // For profile picture
  sessionExpiry?: string;
}

export interface MedicalRecord {
  id: string;
  name: string;
  date: Date;
}

export interface Recommendation {
  id: string;
  date: Date;
  symptoms: string;
  recommendation: string;
  confidenceScore: number;
}
