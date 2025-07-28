import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { MedicalHistory, Patient } from "@/types";
import { TreatmentChecklist, ChecklistItem } from "./TreatmentChecklist";

const treatmentFormSchema = z.object({
  rightVision: z.string().optional(),
  leftVision: z.string().optional(),
  rightCylindricalRefraction: z.string().optional(),
  leftCylindricalRefraction: z.string().optional(),
  rightSphericalRefraction: z.string().optional(),
  leftSphericalRefraction: z.string().optional(),
  rightGlasses: z.string().optional(),
  leftGlasses: z.string().optional(),
  pupilDistance: z.string().optional(),
  angleOfView: z.string().optional(),
  nearPointOfConvergence: z.string().optional(),
  depthPerception: z.string().optional(),
  treatmentNotes: z.string().optional(),
  followupNotes: z.string().optional(),
  prescriptionNotes: z.string().optional(),
});

type TreatmentFormValues = z.infer<typeof treatmentFormSchema>;

interface TreatmentFormProps {
  patient: Patient;
  onTreatmentSaved: (history: MedicalHistory) => void;
  isReturningPatient?: boolean;
}

export const TreatmentForm = ({ patient, onTreatmentSaved, isReturningPatient = true }: TreatmentFormProps) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  const form = useForm<TreatmentFormValues>({
    resolver: zodResolver(treatmentFormSchema),
    defaultValues: {},
  });

  const handleChecklistChange = (items: ChecklistItem[]) => {
    setChecklist(items);
  };

  const onSubmit = (data: TreatmentFormValues) => {
    const checklistSummary = checklist.map(item => {
      const itemText = item.itemId;
      const status = item.status === "done" 
        ? "בוצע" 
        : item.status === "not-done" 
          ? "לא בוצע" 
          : "לא רלוונטי";
      return `${itemText}: ${status}`;
    }).join(", ");
    
    const date = new Date().toLocaleDateString();
    const newHistory: MedicalHistory = {
      id: (Date.now()).toString(),
      patientId: patient.id,
      date,
      visionData: {
        rightVision: data.rightVision || "",
        leftVision: data.leftVision || "",
        rightCylindricalRefraction: data.rightCylindricalRefraction || "",
        leftCylindricalRefraction: data.leftCylindricalRefraction || "",
        rightSphericalRefraction: data.rightSphericalRefraction || "",
        leftSphericalRefraction: data.leftSphericalRefraction || ""
      },
      lensesData: {
        rightGlasses: data.rightGlasses || "",
        leftGlasses: data.leftGlasses || "",
        pupilDistance: data.pupilDistance || "",
        angleOfView: data.angleOfView || "",
        nearPointOfConvergence: data.nearPointOfConvergence || "",
        depthPerception: data.depthPerception || ""
      },
      treatmentNotes: `${data.treatmentNotes || ""} (רשימת בדיקות: ${checklistSummary})`,
      followupNotes: data.followupNotes || "",
      prescriptionNotes: data.prescriptionNotes || ""
    };
    
    onTreatmentSaved(newHistory);
    
    toast({
      title: "טיפול נרשם בהצלחה",
      description: "פרטי הטיפול נשמרו בהיסטוריית המטופל",
      duration: 2000
    });
    
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {isReturningPatient && <TreatmentChecklist onChange={handleChecklistChange} />}
        
        <Card>
          <CardHeader>
            <CardTitle>נתוני ראייה</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-center">חדות ראייה</h3>
                <FormField
                  control={form.control}
                  name="rightVision"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>עין ימין</FormLabel>
                      <FormControl>
                        <Input placeholder="6/6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="leftVision"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>עין שמאל</FormLabel>
                      <FormControl>
                        <Input placeholder="6/6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-center">שבירה צילינדרית</h3>
                <FormField
                  control={form.control}
                  name="rightCylindricalRefraction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>עין ימין</FormLabel>
                      <FormControl>
                        <Input placeholder="-0.50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="leftCylindricalRefraction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>עין שמאל</FormLabel>
                      <FormControl>
                        <Input placeholder="-0.75" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-center">שבירה ספרית</h3>
                <FormField
                  control={form.control}
                  name="rightSphericalRefraction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>עין ימין</FormLabel>
                      <FormControl>
                        <Input placeholder="-1.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="leftSphericalRefraction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>עין שמאל</FormLabel>
                      <FormControl>
                        <Input placeholder="-1.25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>נתוני עדשות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-center">משקפיים</h3>
                <FormField
                  control={form.control}
                  name="rightGlasses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>עין ימין</FormLabel>
                      <FormControl>
                        <Input placeholder="-1.50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="leftGlasses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>עין שמאל</FormLabel>
                      <FormControl>
                        <Input placeholder="-1.75" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-center">פרמטרים נוספים</h3>
                <FormField
                  control={form.control}
                  name="pupilDistance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>מרחק אישונים</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="בחר אפשרות" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="תקין">תקין</SelectItem>
                            <SelectItem value="לא תקין">לא תקין</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="angleOfView"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>זווית מבט</FormLabel>
                      <FormControl>
                        <Input placeholder="10°" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-center">מדדים נוספים</h3>
                <FormField
                  control={form.control}
                  name="nearPointOfConvergence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>נקודת התכנסות קרובה</FormLabel>
                      <FormControl>
                        <Input placeholder="5cm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="depthPerception"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תפיסת עומק</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="בחר אפשרות" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="שכר">שכר</SelectItem>
                            <SelectItem value="לא שכר">לא שכר</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>הערות טיפול ומעקב</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="treatmentNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>הערות טיפול</FormLabel>
                    <FormControl>
                      <textarea 
                        placeholder="פרטי הטיפול והמלצות..." 
                        {...field}
                        className="w-full min-h-[80px] p-2 border border-gray-300 rounded-md text-right"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="followupNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>הערות למעקב</FormLabel>
                    <FormControl>
                      <textarea 
                        placeholder="פרטים למעקב בעתיד..." 
                        {...field}
                        className="w-full min-h-[80px] p-2 border border-gray-300 rounded-md text-right"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="prescriptionNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>מרשם</FormLabel>
                    <FormControl>
                      <textarea 
                        placeholder="פרטי מרשם שניתן..." 
                        {...field}
                        className="w-full min-h-[80px] p-2 border border-gray-300 rounded-md text-right"
                        dir="rtl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mt-6">
              <Button type="submit">שמור טיפול</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
