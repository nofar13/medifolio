
import { z } from "zod";

export const patientFormSchema = z.object({
  idNumber: z.string().min(5, "מספר תעודת זהות חייב להכיל לפחות 5 תווים"),
  name: z.string().min(2, "שם המטופל חייב להכיל לפחות 2 תווים"),
  phone: z.string().min(9, "מספר טלפון חייב להכיל לפחות 9 ספרות"),
  email: z.string().email("נא להזין כתובת אימייל תקינה"),
  age: z.coerce.number().min(0, "גיל לא יכול להיות שלילי"),
  gender: z.enum(["זכר", "נקבה", "אחר"]),
  additionalNotes: z.string().optional(),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;
