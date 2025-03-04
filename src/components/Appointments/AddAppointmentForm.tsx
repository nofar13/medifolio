
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, isBefore, startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { patients } from "@/data/mockData";
import { Appointment } from "@/types";

// Validate that the date is in the future
const formSchema = z.object({
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

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00"
];

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
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>מטופל</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר מטופל" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} - {patient.idNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>תאריך</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-right font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>בחר תאריך</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) => isBefore(date, startOfDay(new Date()))}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>שעה</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="בחר שעה" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>הערות לפגישה</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="תיאור הסיבה לביקור, בקשות מיוחדות..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
