
export interface Patient {
  id: string;
  idNumber: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
  additionalNotes?: string;
  medicalHistory?: MedicalHistory[];
}

export interface MedicalHistory {
  id: string;
  patientId: string;
  date: string;
  visionData: VisionData;
  lensesData: LensesData;
  treatmentNotes?: string;
  followupNotes?: string;
  prescriptionNotes?: string;
}

export interface VisionData {
  rightVision: string;
  leftVision: string;
  rightCylindricalRefraction: string;
  leftCylindricalRefraction: string;
  rightSphericalRefraction: string;
  leftSphericalRefraction: string;
}

export interface LensesData {
  rightGlasses: string;
  leftGlasses: string;
  pupilDistance: string;
  angleOfView: string;
  nearPointOfConvergence: string;
  depthPerception: string;
}

export interface ChartData {
  month: string;
  patients: number;
}

export interface PatientDistribution {
  name: string;
  value: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export type PatientFormData = Omit<Patient, 'id' | 'medicalHistory'>;
export type MedicalHistoryFormData = Omit<MedicalHistory, 'id' | 'patientId'>;
