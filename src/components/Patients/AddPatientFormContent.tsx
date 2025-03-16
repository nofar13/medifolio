
import { PatientFormData } from "@/types";
import { UseFormReturn } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface AddPatientFormContentProps {
  form: UseFormReturn<PatientFormData>;
  onSubmit: (data: PatientFormData) => void;
}

const AddPatientFormContent = ({ form, onSubmit }: AddPatientFormContentProps) => {
  return (
    <>
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
    </>
  );
};

export default AddPatientFormContent;
