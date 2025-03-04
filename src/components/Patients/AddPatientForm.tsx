import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { PatientFormData, Patient } from "@/types";
import { toast } from "@/hooks/use-toast";
import { PlusCircle, UserCog } from "lucide-react";

const formSchema = z.object({
  idNumber: z.string().min(5, { message: "חובה להזין ת.ז תקינה" }),
  name: z.string().min(2, { message: "חובה להזין שם מלא" }),
  phone: z.string().min(9, { message: "חובה להזין מספר טלפון תקין" }),
  email: z.string().email({ message: "יש להזין אימייל תקין" }),
  age: z.coerce.number().min(1, { message: "חובה להזין גיל תקין" }),
  gender: z.enum(["זכר", "נקבה", "אחר"], { required_error: "יש לבחור מגדר" }),
  additionalNotes: z.string().optional(),
});

interface AddPatientFormProps {
  onPatientAdded?: (patient: Patient) => void;
  patient?: Patient;
  isEditing?: boolean;
}

const AddPatientForm = ({ onPatientAdded, patient, isEditing = false }: AddPatientFormProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<PatientFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idNumber: "",
      name: "",
      phone: "",
      email: "",
      age: undefined,
      gender: undefined,
      additionalNotes: "",
    },
  });

  useEffect(() => {
    if (patient && isEditing) {
      form.reset({
        idNumber: patient.idNumber,
        name: patient.name,
        phone: patient.phone,
        email: patient.email,
        age: patient.age,
        gender: patient.gender as "זכר" | "נקבה" | "אחר",
        additionalNotes: patient.additionalNotes || "",
      });
    }
  }, [patient, form, isEditing]);

  function onSubmit(data: PatientFormData) {
    if (isEditing && patient) {
      const updatedPatient: Patient = {
        ...patient,
        ...data,
      };
      
      console.log("Updating patient:", updatedPatient);
      
      if (onPatientAdded) {
        onPatientAdded(updatedPatient);
      }
    } else {
      const newPatient: Patient = {
        id: Date.now().toString(), // Generate a temporary ID
        ...data,
        medicalHistory: [],
      };
  
      console.log("Adding new patient:", newPatient);
      
      toast({
        title: "מטופל חדש נוסף בהצלחה",
        description: `המטופל ${data.name} נוסף למערכת`,
      });
  
      if (onPatientAdded) {
        onPatientAdded(newPatient);
      }
  
      setOpen(false);
      form.reset();
    }
  }

  if (isEditing) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">עריכת פרטי מטופל</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם מלא</FormLabel>
                  <FormControl>
                    <Input placeholder="ישראל ישראלי" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>תעודת זהות</FormLabel>
                  <FormControl>
                    <Input placeholder="מספר ת.ז." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>טלפון</FormLabel>
                  <FormControl>
                    <Input placeholder="050-1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>אימייל</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>גיל</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>מגדר</FormLabel>
                  <FormControl>
                    <RadioGroup
                      dir="rtl"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4 rtl:space-x-reverse"
                    >
                      <FormItem className="flex items-center space-x-2 space-x-reverse">
                        <FormControl>
                          <RadioGroupItem value="זכר" />
                        </FormControl>
                        <FormLabel className="font-normal">זכר</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-x-reverse">
                        <FormControl>
                          <RadioGroupItem value="נקבה" />
                        </FormControl>
                        <FormLabel className="font-normal">נקבה</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-x-reverse">
                        <FormControl>
                          <RadioGroupItem value="אחר" />
                        </FormControl>
                        <FormLabel className="font-normal">אחר</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>הערות נוספות</FormLabel>
                <FormControl>
                  <Textarea placeholder="מידע רפואי, הערות, או פרטים נוספים..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="sm:justify-center">
            <Button type="submit" className="w-full md:w-auto">
              {isEditing ? "עדכן מטופל" : "שמור מטופל"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="ml-2 h-4 w-4" />
          הוסף מטופל חדש
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">הוספת מטופל חדש</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>שם מלא</FormLabel>
                    <FormControl>
                      <Input placeholder="ישראל ישראלי" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>תעודת זהות</FormLabel>
                    <FormControl>
                      <Input placeholder="מספר ת.ז." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>טלפון</FormLabel>
                    <FormControl>
                      <Input placeholder="050-1234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>אימייל</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>גיל</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>מגדר</FormLabel>
                    <FormControl>
                      <RadioGroup
                        dir="rtl"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4 rtl:space-x-reverse"
                      >
                        <FormItem className="flex items-center space-x-2 space-x-reverse">
                          <FormControl>
                            <RadioGroupItem value="זכר" />
                          </FormControl>
                          <FormLabel className="font-normal">זכר</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-x-reverse">
                          <FormControl>
                            <RadioGroupItem value="נקבה" />
                          </FormControl>
                          <FormLabel className="font-normal">נקבה</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-x-reverse">
                          <FormControl>
                            <RadioGroupItem value="אחר" />
                          </FormControl>
                          <FormLabel className="font-normal">אחר</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>הערות נוספות</FormLabel>
                  <FormControl>
                    <Textarea placeholder="מידע רפואי, הערות, או פרטים נוספים..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-center">
              <Button type="submit" className="w-full md:w-auto">שמור מטופל</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientForm;
