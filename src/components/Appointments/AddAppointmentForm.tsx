
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
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { patients } from "@/data/mockData";
import { Appointment } from "@/types";
import { PatientSelector } from "./PatientSelector";
import { DateSelector } from "./DateSelector";
import { TimeSelector } from "./TimeSelector";
import { NotesField } from "./NotesField";
import { formSchema, timeSlots } from "./appointmentFormSchema";

interface AddAppointmentFormProps {
  onAppointmentAdded?: (appointment: Appointment) => void;
}

const AddAppointmentForm = ({ onAppointmentAdded }: AddAppointmentFormProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const patient = patients.find(p => p.id === data.patientId);
    
    if (!patient) {
      toast({
        title: "שגיאה",
        description: "לא נמצא מטופל מתאים",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would call an API here
    const newAppointment: Appointment = {
      id: Date.now().toString(), // Generate a temporary ID
      patientId: data.patientId,
      patientName: patient.name,
      date: format(data.date, "yyyy-MM-dd"),
      time: data.time,
      status: "scheduled",
      notes: data.notes,
    };

    // Simulate saving to database
    console.log("Adding new appointment:", newAppointment);
    
    toast({
      title: "פגישה חדשה נוספה בהצלחה",
      description: `פגישה למטופל ${patient.name} נקבעה לתאריך ${format(data.date, "dd/MM/yyyy")} בשעה ${data.time}`,
    });

    if (onAppointmentAdded) {
      onAppointmentAdded(newAppointment);
    }

    // Close the dialog and reset the form
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="ml-2 h-4 w-4" />
          קבע פגישה חדשה
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">קביעת פגישה חדשה</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <PatientSelector form={form} patients={patients} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateSelector form={form} />
              <TimeSelector form={form} timeSlots={timeSlots} />
            </div>
            
            <NotesField form={form} />
            
            <DialogFooter className="sm:justify-center">
              <Button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">קבע פגישה</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppointmentForm;
