import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { patients } from "@/data/mockData";
import { Appointment } from "@/types";
import { PatientSelector } from "./PatientSelector";
import { DateSelector } from "./DateSelector";
import { TimeSelector } from "./TimeSelector";
import { NotesField } from "./NotesField";
import { formSchema, timeSlots } from "./appointmentFormSchema";

interface EditAppointmentFormProps {
  appointment: Appointment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAppointmentUpdated?: (appointment: Appointment) => void;
}

const EditAppointmentForm = ({ 
  appointment, 
  open, 
  onOpenChange, 
  onAppointmentUpdated 
}: EditAppointmentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: appointment.patientId,
      date: new Date(appointment.date.split('/').reverse().join('-')), // Convert DD/MM/YYYY to Date
      time: appointment.time,
      notes: appointment.notes || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const updatedAppointment: Appointment = {
      ...appointment,
      patientId: values.patientId,
      patientName: appointment.patientName, // Keep the same patient name for now
      date: format(values.date, "dd/MM/yyyy"),
      time: values.time,
      notes: values.notes,
    };

    console.log("Updating appointment:", updatedAppointment);
    
    toast({
      title: "הפגישה עודכנה בהצלחה",
      description: `פגישה עם ${appointment.patientName} ב-${format(values.date, "dd/MM/yyyy")} בשעה ${values.time}`,
    });

    if (onAppointmentUpdated) {
      onAppointmentUpdated(updatedAppointment);
    }

    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle>עריכת פגישה</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PatientSelector form={form} patients={patients} />
            <DateSelector form={form} />
            <TimeSelector form={form} timeSlots={timeSlots} />
            <NotesField form={form} />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                ביטול
              </Button>
              <Button type="submit">עדכן פגישה</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAppointmentForm;