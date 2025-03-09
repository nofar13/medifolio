
import { Patient, MedicalHistory, ChartData, PatientDistribution, Appointment } from "@/types";
import { addDays, format, subDays } from "date-fns";

// Generate dates for tomorrow, day after tomorrow, and day after that
const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");
const dayAfterTomorrow = format(addDays(new Date(), 2), "yyyy-MM-dd");
const threeDaysFromNow = format(addDays(new Date(), 3), "yyyy-MM-dd");

// Generate past dates for completed appointments
const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");
const twoDaysAgo = format(subDays(new Date(), 2), "yyyy-MM-dd");

export const patients: Patient[] = [
  {
    id: "1",
    idNumber: "207205208",
    name: "יוסי כהן",
    phone: "050-1234567",
    email: "yossi@example.com",
    age: 35,
    gender: "זכר",
    additionalNotes: "אלרגיה לאבק",
    medicalHistory: []
  },
  {
    id: "2",
    idNumber: "305412687",
    name: "שרה לוי",
    phone: "052-7654321",
    email: "sarah@example.com",
    age: 42,
    gender: "נקבה",
    additionalNotes: "מרכיבה עדשות מגע",
    medicalHistory: []
  },
  {
    id: "3",
    idNumber: "401236589",
    name: "דוד ישראלי",
    phone: "054-9876543",
    email: "david@example.com",
    age: 28,
    gender: "זכר",
    additionalNotes: "אחרי ניתוח לייזר בשנת 2020",
    medicalHistory: []
  }
];

export const medicalHistories: MedicalHistory[] = [
  {
    id: "1",
    patientId: "1",
    date: "01/01/2024",
    visionData: {
      rightVision: "6/6",
      leftVision: "6/9",
      rightCylindricalRefraction: "0.75-",
      leftCylindricalRefraction: "1.50-",
      rightSphericalRefraction: "1.00-",
      leftSphericalRefraction: "2.50-"
    },
    lensesData: {
      rightGlasses: "2.00-",
      leftGlasses: "2.50-",
      pupilDistance: "תקין",
      angleOfView: "10°",
      nearPointOfConvergence: "5cm",
      depthPerception: "שכר"
    },
    treatmentNotes: "הומלץ על משקפיים חדשים עם ציפוי אנטי רפלקס",
    followupNotes: "ביקורת בעוד 6 חודשים",
    prescriptionNotes: "מרשם למשקפיים ניתן"
  },
  {
    id: "2",
    patientId: "1",
    date: "15/01/2024",
    visionData: {
      rightVision: "6/7.5",
      leftVision: "6/9",
      rightCylindricalRefraction: "0.50-",
      leftCylindricalRefraction: "1.25-",
      rightSphericalRefraction: "0.75-",
      leftSphericalRefraction: "2.25-"
    },
    lensesData: {
      rightGlasses: "1.75-",
      leftGlasses: "2.25-",
      pupilDistance: "תקין",
      angleOfView: "8°",
      nearPointOfConvergence: "6cm",
      depthPerception: "שכר"
    },
    treatmentNotes: "נבדק עם משקפיים חדשים, תפקוד טוב",
    followupNotes: "ביקורת בעוד שנה",
    prescriptionNotes: "אין צורך במרשם חדש"
  },
  {
    id: "3",
    patientId: "1",
    date: "30/01/2024",
    visionData: {
      rightVision: "6/7.5",
      leftVision: "6/12",
      rightCylindricalRefraction: "0.25-",
      leftCylindricalRefraction: "1.00-",
      rightSphericalRefraction: "0.50-",
      leftSphericalRefraction: "2.00-"
    },
    lensesData: {
      rightGlasses: "1.50-",
      leftGlasses: "2.00-",
      pupilDistance: "תקין",
      angleOfView: "7°",
      nearPointOfConvergence: "7cm",
      depthPerception: "שכר"
    },
    treatmentNotes: "התקדמות חיובית, שיפור קל בראייה",
    followupNotes: "ביקורת בעוד שנה",
    prescriptionNotes: "אין צורך במרשם חדש"
  }
];

export const monthlyPatientsData: ChartData[] = [
  { month: "ינואר", patients: 8000 },
  { month: "פברואר", patients: 12000 },
  { month: "מרץ", patients: 10000 },
  { month: "אפריל", patients: 15000 },
  { month: "מאי", patients: 13000 },
  { month: "יוני", patients: 17000 }
];

export const patientDistributionData: PatientDistribution[] = [
  { name: "מטופלים חדשים", value: 40 },
  { name: "מטופלים חוזרים", value: 60 }
];

// Modified wait time data with varying times around 22 minutes
export const patientWaitTimeData = [
  { name: "ספטמבר", minutes: 21 },
  { name: "אוקטובר", minutes: 24 },
  { name: "נובמבר", minutes: 20 },
  { name: "דצמבר", minutes: 23 },
  { name: "ינואר", minutes: 22 },
];

export const appointments: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "יוסי כהן",
    date: tomorrow,
    time: "09:00",
    status: "scheduled",
    notes: "בדיקת עיניים שגרתית"
  },
  {
    id: "2",
    patientId: "2",
    patientName: "שרה לוי",
    date: dayAfterTomorrow,
    time: "10:30",
    status: "scheduled",
    notes: "התאמת עדשות מגע חדשות"
  },
  {
    id: "3",
    patientId: "3",
    patientName: "דוד ישראלי",
    date: yesterday,
    time: "14:00",
    status: "completed",
    notes: "ביקורת אחרי ניתוח"
  },
  {
    id: "4",
    patientId: "1",
    patientName: "יוסי כהן",
    date: twoDaysAgo,
    time: "11:30",
    status: "completed",
    notes: "בדיקת לחץ תוך-עיני"
  }
];
