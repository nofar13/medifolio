
import { z } from "zod";

export const patientFormSchema = z.object({
  idNumber: z.string().min(5, { message: "חובה להזין ת.ז תקינה" }),
  name: z.string().min(2, { message: "חובה להזין שם מלא" }),
  phone: z.string().min(9, { message: "חובה להזין מספר טלפון תקין" }),
  email: z.string().email({ message: "יש להזין אימייל תקין" }),
  age: z.coerce.number().min(1, { message: "חובה להזין גיל תקין" }),
  gender: z.enum(["זכר", "נקבה", "אחר"], { required_error: "יש לבחור מגדר" }),
  additionalNotes: z.string().optional(),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;
