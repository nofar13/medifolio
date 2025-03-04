
import { z } from "zod";
import { isBefore, startOfDay } from "date-fns";

// Validate that the date is in the future
export const formSchema = z.object({
  patientId: z.string({
    required_error: "יש לבחור מטופל",
  }),
  date: z.date({
    required_error: "יש לבחור תאריך",
  }).refine(
    (date) => !isBefore(date, startOfDay(new Date())),
    {
      message: "לא ניתן לקבוע פגישה לתאריך שעבר",
    }
  ),
  time: z.string({
    required_error: "יש לבחור שעה",
  }),
  notes: z.string().optional(),
});

export const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00"
];
