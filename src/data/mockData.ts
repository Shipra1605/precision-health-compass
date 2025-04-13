
// Patient Data Types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  bloodType: string;
  allergies: string[];
  profileImage?: string;
}

export interface MedicalHistory {
  patientId: string;
  conditions: {
    name: string;
    diagnosedDate: string;
    status: 'active' | 'resolved' | 'in-remission';
  }[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
  }[];
  surgeries: {
    procedure: string;
    date: string;
    notes?: string;
  }[];
  familyHistory: {
    condition: string;
    relation: string;
  }[];
}

export interface GeneticProfile {
  patientId: string;
  markers: {
    id: string;
    name: string;
    value: string;
    risk: 'low' | 'moderate' | 'high';
    description: string;
  }[];
  ancestry: Record<string, number>;
  responseFactors: {
    medication: string;
    effectiveness: 'high' | 'moderate' | 'low';
    sideEffectRisk: 'high' | 'moderate' | 'low';
  }[];
}

export interface CurrentSymptom {
  id: string;
  name: string;
  severity: number; // 1-10
  duration: string;
  frequency: 'constant' | 'intermittent' | 'occasional';
  aggravatingFactors: string[];
  relievingFactors: string[];
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  date: string;
  primaryCondition: string;
  recommendedMedications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    purpose: string;
    potentialSideEffects: string[];
    effectiveness: number; // 0-100%
    confidenceScore: number; // 0-100%
  }[];
  lifestyleChanges: {
    category: 'diet' | 'exercise' | 'sleep' | 'other';
    recommendation: string;
    importance: number; // 1-10
  }[];
  followUpRecommendation: {
    timeframe: string;
    specialist?: string;
    tests?: string[];
  };
  precisionScore: number; // 0-100%
  notes: string;
}

// Mock Data
export const mockPatient: Patient = {
  id: "P12345",
  firstName: "Jane",
  lastName: "Smith",
  age: 42,
  gender: "female",
  height: 165, // cm
  weight: 68, // kg
  bloodType: "O+",
  allergies: ["Penicillin", "Peanuts"],
  profileImage: "https://randomuser.me/api/portraits/women/65.jpg"
};

export const mockMedicalHistory: MedicalHistory = {
  patientId: "P12345",
  conditions: [
    {
      name: "Type 2 Diabetes",
      diagnosedDate: "2020-03-15",
      status: "active"
    },
    {
      name: "Hypertension",
      diagnosedDate: "2018-07-22",
      status: "active"
    },
    {
      name: "Asthma",
      diagnosedDate: "2005-11-03",
      status: "in-remission"
    }
  ],
  medications: [
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2020-03-20"
    },
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2018-08-05"
    }
  ],
  surgeries: [
    {
      procedure: "Appendectomy",
      date: "2010-05-12",
      notes: "No complications"
    }
  ],
  familyHistory: [
    {
      condition: "Type 2 Diabetes",
      relation: "Mother"
    },
    {
      condition: "Coronary Heart Disease",
      relation: "Father"
    }
  ]
};

export const mockGeneticProfile: GeneticProfile = {
  patientId: "P12345",
  markers: [
    {
      id: "rs1801133",
      name: "MTHFR C677T",
      value: "CT Heterozygous",
      risk: "moderate",
      description: "Associated with reduced enzyme activity and elevated homocysteine levels."
    },
    {
      id: "rs4588",
      name: "GC (Vitamin D Binding Protein)",
      value: "AC Heterozygous",
      risk: "low",
      description: "May affect vitamin D metabolism and transport."
    },
    {
      id: "rs429358",
      name: "APOE",
      value: "CT Heterozygous",
      risk: "moderate",
      description: "May affect cholesterol metabolism and cardiovascular risk."
    }
  ],
  ancestry: {
    "European": 65,
    "East Asian": 20,
    "African": 10,
    "South Asian": 5
  },
  responseFactors: [
    {
      medication: "Metformin",
      effectiveness: "high",
      sideEffectRisk: "low"
    },
    {
      medication: "Statins",
      effectiveness: "moderate",
      sideEffectRisk: "moderate"
    },
    {
      medication: "SSRIs",
      effectiveness: "low",
      sideEffectRisk: "high"
    }
  ]
};

export const mockSymptoms: CurrentSymptom[] = [
  {
    id: "S1",
    name: "Fatigue",
    severity: 7,
    duration: "3 weeks",
    frequency: "constant",
    aggravatingFactors: ["Physical activity", "Stress"],
    relievingFactors: ["Rest"]
  },
  {
    id: "S2",
    name: "Headache",
    severity: 5,
    duration: "1 week",
    frequency: "intermittent",
    aggravatingFactors: ["Bright light", "Noise"],
    relievingFactors: ["Darkness", "Pain medication"]
  },
  {
    id: "S3",
    name: "Joint pain",
    severity: 6,
    duration: "2 months",
    frequency: "occasional",
    aggravatingFactors: ["Cold weather", "Physical activity"],
    relievingFactors: ["Warm compress", "Anti-inflammatory medication"]
  }
];

export const mockTreatmentPlan: TreatmentPlan = {
  id: "TP12345",
  patientId: "P12345",
  date: "2025-04-10",
  primaryCondition: "Type 2 Diabetes with Fatigue",
  recommendedMedications: [
    {
      name: "Metformin XR",
      dosage: "1000mg",
      frequency: "Once daily",
      duration: "Ongoing",
      purpose: "Blood glucose management",
      potentialSideEffects: ["Nausea", "Diarrhea", "Abdominal discomfort"],
      effectiveness: 85,
      confidenceScore: 92
    },
    {
      name: "CoQ10 Supplement",
      dosage: "100mg",
      frequency: "Once daily",
      duration: "3 months trial",
      purpose: "Energy production, fatigue management",
      potentialSideEffects: ["Mild insomnia", "Rash"],
      effectiveness: 68,
      confidenceScore: 75
    }
  ],
  lifestyleChanges: [
    {
      category: "diet",
      recommendation: "Mediterranean diet with emphasis on low glycemic foods",
      importance: 9
    },
    {
      category: "exercise",
      recommendation: "Moderate intensity walking for 30 minutes, 5 days per week",
      importance: 8
    },
    {
      category: "sleep",
      recommendation: "Sleep hygiene improvement with 7-8 hours target",
      importance: 7
    }
  ],
  followUpRecommendation: {
    timeframe: "6 weeks",
    specialist: "Endocrinologist",
    tests: ["HbA1c", "Comprehensive Metabolic Panel", "Vitamin D levels"]
  },
  precisionScore: 87,
  notes: "Treatment plan optimized based on genetic profile showing favorable Metformin response. Potential MTHFR variant impact addressed with B-vitamin rich diet recommendation."
};

// Symptom suggestions for the symptom selector component
export const symptomSuggestions = [
  "Fatigue", "Headache", "Dizziness", "Nausea", "Abdominal pain", 
  "Chest pain", "Shortness of breath", "Cough", "Fever", "Chills",
  "Joint pain", "Muscle pain", "Back pain", "Neck pain", "Sore throat",
  "Runny nose", "Congestion", "Ear pain", "Vision changes", "Numbness",
  "Tingling", "Weakness", "Difficulty sleeping", "Anxiety", "Depression",
  "Weight loss", "Weight gain", "Loss of appetite", "Increased appetite",
  "Frequent urination", "Painful urination", "Blood in urine", "Constipation",
  "Diarrhea", "Vomiting", "Heartburn", "Rash", "Itching", "Swelling",
  "Hair loss", "Dry skin", "Easy bruising", "Bleeding", "Memory problems",
  "Confusion", "Difficulty concentrating", "Tremors", "Balance problems",
  "Dizziness when standing"
];

// Medical conditions for conditions selector
export const medicalConditions = [
  "Type 2 Diabetes", "Hypertension", "Hyperlipidemia", "Asthma", "COPD",
  "Coronary Artery Disease", "Heart Failure", "Atrial Fibrillation", "Stroke",
  "Osteoarthritis", "Rheumatoid Arthritis", "Osteoporosis", "Hypothyroidism",
  "Hyperthyroidism", "Chronic Kidney Disease", "Liver Disease", "GERD",
  "Irritable Bowel Syndrome", "Crohn's Disease", "Ulcerative Colitis",
  "Migraine", "Epilepsy", "Parkinson's Disease", "Multiple Sclerosis",
  "Alzheimer's Disease", "Depression", "Anxiety Disorder", "Bipolar Disorder",
  "Schizophrenia", "ADHD", "Autism Spectrum Disorder", "Fibromyalgia",
  "Chronic Fatigue Syndrome", "Sleep Apnea", "Insomnia", "Glaucoma",
  "Macular Degeneration", "Cataracts", "Hearing Loss", "Anemia",
  "Hemophilia", "Sickle Cell Disease", "HIV/AIDS", "Hepatitis",
  "Tuberculosis", "Lyme Disease", "Cancer"
];

// Helper function to generate a treatment plan based on patient data
export const generateTreatmentPlan = (
  patient: Patient,
  medicalHistory: MedicalHistory,
  geneticProfile: GeneticProfile,
  selectedSymptoms: CurrentSymptom[],
  selectedCondition: string
): TreatmentPlan => {
  // In a real application, this would contain complex ML logic
  // For this demo, we'll just return a treatment plan that looks personalized
  
  const today = new Date().toISOString().split('T')[0];
  
  // Simple logic to show different recommendations based on symptoms
  const hasFatigue = selectedSymptoms.some(s => s.name.toLowerCase().includes('fatigue'));
  const hasPain = selectedSymptoms.some(s => s.name.toLowerCase().includes('pain'));
  
  // Simplified personalization logic
  return {
    id: `TP${Math.floor(Math.random() * 100000)}`,
    patientId: patient.id,
    date: today,
    primaryCondition: selectedCondition || "Unspecified Condition",
    recommendedMedications: [
      {
        name: hasFatigue ? "CoQ10 Supplement" : "Targeted Medication A",
        dosage: "100mg",
        frequency: "Once daily",
        duration: "3 months trial",
        purpose: hasFatigue ? "Energy production, fatigue management" : "Symptom management",
        potentialSideEffects: ["Mild insomnia", "Rash"],
        effectiveness: 65 + Math.floor(Math.random() * 20),
        confidenceScore: 70 + Math.floor(Math.random() * 20)
      },
      {
        name: hasPain ? "Anti-inflammatory Compound B" : "Supportive Medication B",
        dosage: "50mg",
        frequency: "Twice daily",
        duration: "As needed",
        purpose: hasPain ? "Pain management" : "Supporting therapy",
        potentialSideEffects: ["Nausea", "Dizziness"],
        effectiveness: 60 + Math.floor(Math.random() * 25),
        confidenceScore: 65 + Math.floor(Math.random() * 25)
      }
    ],
    lifestyleChanges: [
      {
        category: "diet",
        recommendation: geneticProfile.ancestry["European"] > 50 
          ? "Mediterranean diet with emphasis on low glycemic foods" 
          : "Balanced diet adapted to genetic ancestry profile",
        importance: 8 + Math.floor(Math.random() * 3)
      },
      {
        category: "exercise",
        recommendation: patient.age > 50 
          ? "Low impact exercise like swimming or walking, 30 minutes daily" 
          : "Moderate intensity exercise, 45 minutes, 4-5 times per week",
        importance: 7 + Math.floor(Math.random() * 3)
      },
      {
        category: "sleep",
        recommendation: hasFatigue 
          ? "Sleep optimization protocol with 8 hours target and improved sleep hygiene" 
          : "Regular sleep schedule, 7-8 hours per night",
        importance: 6 + Math.floor(Math.random() * 4)
      }
    ],
    followUpRecommendation: {
      timeframe: "4-6 weeks",
      specialist: selectedCondition.includes("Diabetes") ? "Endocrinologist" : "Appropriate Specialist",
      tests: ["Comprehensive Metabolic Panel", "Follow-up assessment"]
    },
    precisionScore: 75 + Math.floor(Math.random() * 15),
    notes: `Personalized treatment plan generated for ${patient.firstName} ${patient.lastName} based on comprehensive data analysis, including genetic markers, medical history, and current symptoms.`
  };
};
