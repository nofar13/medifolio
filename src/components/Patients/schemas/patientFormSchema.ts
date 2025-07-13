
import { z } from "zod";

export const patientFormSchema = z.object({
  idNumber: z.string()
    .min(9, { message: "תעודת זהות חייבת להכיל לפחות 9 ספרות" })
    .regex(/^\d+$/, { message: "תעודת זהות יכולה להכיל רק מספרים" }),
  name: z.string()
    .min(2, { message: "חובה להזין שם מלא" })
    .regex(/^[א-ת\s]+$/, { message: "שם יכול להכיל רק אותיות עבריות ורווחים" }),
  phone: z.string()
    .min(9, { message: "מספר טלפון חייב להכיל לפחות 9 ספרות" })
    .regex(/^\d+$/, { message: "מספר טלפון יכול להכיל רק מספרים" }),
  email: z.string().email({ message: "יש להזין אימייל תקין" }),
  age: z.coerce.number().min(1, { message: "חובה להזין גיל תקין" }),
  gender: z.enum(["זכר", "נקבה", "אחר"], { required_error: "יש לבחור מגדר" }),
  additionalNotes: z.string().optional(),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;
