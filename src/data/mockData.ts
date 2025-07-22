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
  },
  {
    id: "4",
    idNumber: "309876543",
    name: "רחל גולדמן",
    phone: "053-9876543",
    email: "rachel@example.com",
    age: 56,
    gender: "נקבה",
    additionalNotes: "סובלת מיובש בעיניים",
    medicalHistory: []
  },
  {
    id: "5",
    idNumber: "208765432",
    name: "משה אברהם",
    phone: "050-8765432",
    email: "moshe@example.com",
    age: 62,
    gender: "זכר",
    additionalNotes: "התחלת קטרקט בעין ימין",
    medicalHistory: []
  },
  {
    id: "6",
    idNumber: "405678901",
    name: "נועה שטיין",
    phone: "055-6789012",
    email: "noa@example.com",
    age: 25,
    gender: "נקבה",
    additionalNotes: "מיופיה גבוהה",
    medicalHistory: []
  },
  {
    id: "7",
    idNumber: "506789012",
    name: "אלי מזרחי",
    phone: "058-7890123",
    email: "eli@example.com",
    age: 47,
    gender: "זכר",
    additionalNotes: "אסטיגמטיזם",
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
    treatmentNotes: "הומלץ על משקפיים חדשים עם ציפוי אנטי רפלקס (רשימת בדיקות: בדיקת לחץ תוך-עיני: בוצע, בדיקת קרקעית העין: בוצע, מדידת חדות ראייה: בוצע, התאמת משקפיים/עדשות: בוצע)",
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
    treatmentNotes: "נבדק עם משקפיים חדשים, תפקוד טוב (רשימת בדיקות: בדיקת לחץ תוך-עיני: בוצע, בדיקת קרקעית העין: לא בוצע, מדידת חדות ראייה: בוצע, התאמת משקפיים/עדשות: בוצע)",
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
  },
  {
    id: "4",
    patientId: "4",
    date: "10/01/2024",
    visionData: {
      rightVision: "6/12",
      leftVision: "6/12",
      rightCylindricalRefraction: "1.00-",
      leftCylindricalRefraction: "1.00-",
      rightSphericalRefraction: "2.00-",
      leftSphericalRefraction: "2.25-"
    },
    lensesData: {
      rightGlasses: "2.50-",
      leftGlasses: "2.75-",
      pupilDistance: "תקין",
      angleOfView: "12°",
      nearPointOfConvergence: "8cm",
      depthPerception: "תקין"
    },
    treatmentNotes: "טיפות עיניים לטיפול ביובש (רשימת בדיקות: בדיקת לחץ תוך-עיני: בוצע, בדיקת קרקעית העין: בוצע, מדידת חדות ראייה: בוצע, התאמת משקפיים/עדשות: לא רלוונטי)",
    followupNotes: "ביקורת בעוד 3 חודשים",
    prescriptionNotes: "מרשם לטיפות עיניים"
  },
  {
    id: "5",
    patientId: "5",
    date: "15/01/2024",
    visionData: {
      rightVision: "6/15",
      leftVision: "6/9",
      rightCylindricalRefraction: "0.50-",
      leftCylindricalRefraction: "0.25-",
      rightSphericalRefraction: "1.50-",
      leftSphericalRefraction: "1.00-"
    },
    lensesData: {
      rightGlasses: "1.75-",
      leftGlasses: "1.25-",
      pupilDistance: "תקין",
      angleOfView: "9°",
      nearPointOfConvergence: "7cm",
      depthPerception: "תקין"
    },
    treatmentNotes: "המלצה למעקב אחר התפתחות הקטרקט (רשימת בדיקות: בדיקת לחץ תוך-עיני: בוצע, בדיקת קרקעית העין: בוצע, מדידת חדות ראייה: בוצע, התאמת משקפיים/עדשות: לא בוצע)",
    followupNotes: "ביקורת בעוד 4 חודשים",
    prescriptionNotes: "מרשם למשקפיים מעודכן"
  }
];

export const monthlyPatientsData: ChartData[] = [
  { month: "ינואר", patients: 45000 },
  { month: "פברואר", patients: 52000 },
  { month: "מרץ", patients: 48000 },
  { month: "אפריל", patients: 60000 },
  { month: "מאי", patients: 65000 },
  { month: "יוני", patients: 70000 }
];

export const patientDistributionData: PatientDistribution[] = [
  { name: "מטופלים חדשים", value: 40 },
  { name: "מטופלים חוזרים", value: 60 }
];

export const patientWaitTimeData = [
  { name: "ספטמבר", minutes: 21 },
  { name: "אוקטובר", minutes: 24 },
  { name: "נובמבר", minutes: 20 },
  { name: "דצמבר", minutes: 23 },
  { name: "ינואר", minutes: 22 },
];

export const patientsByDoctorData = [
  { name: "ינואר", patients: 120 },
  { name: "פברואר", patients: 150 },
  { name: "מרץ", patients: 140 },
  { name: "אפריל", patients: 160 },
  { name: "מאי", patients: 180 },
  { name: "יוני", patients: 190 }
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
  },
  {
    id: "5",
    patientId: "5",
    patientName: "משה אברהם",
    date: tomorrow,
    time: "13:15",
    status: "scheduled",
    notes: "בדיקת מעקב קטרקט"
  },
  {
    id: "6",
    patientId: "6",
    patientName: "נועה שטיין",
    date: dayAfterTomorrow,
    time: "15:30",
    status: "scheduled",
    notes: "התאמת משקפיים חדשים"
  },
  {
    id: "7",
    patientId: "7",
    patientName: "אלי מזרחי",
    date: threeDaysFromNow,
    time: "09:45",
    status: "scheduled",
    notes: "בדיקה תקופתית"
  }
];

export const patientDistributionOverTime = [
  { month: "ינואר", newPatients: 15, returningPatients: 30 },
  { month: "פברואר", newPatients: 18, returningPatients: 34 },
  { month: "מרץ", newPatients: 20, returningPatients: 28 },
  { month: "אפריל", newPatients: 25, returningPatients: 35 },
  { month: "מאי", newPatients: 22, returningPatients: 43 },
  { month: "יוני", newPatients: 28, returningPatients: 42 }
];

export const treatmentChecklistItems = [
  { id: "1", text: "בדיקת לחץ תוך-עיני" },
  { id: "2", text: "בדיקת קרקעית העין" },
  { id: "3", text: "מדידת חדות ראייה" },
  { id: "4", text: "התאמת משקפיים/עדשות" }
];
