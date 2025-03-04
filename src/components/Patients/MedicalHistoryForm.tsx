
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
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { MedicalHistoryFormData } from "@/types";

const medicalHistorySchema = z.object({
  date: z.string().min(1, "תאריך הביקור נדרש"),
  visionData: z.object({
    rightVision: z.string(),
    leftVision: z.string(),
    rightCylindricalRefraction: z.string(),
    leftCylindricalRefraction: z.string(),
    rightSphericalRefraction: z.string(),
    leftSphericalRefraction: z.string(),
  }),
  lensesData: z.object({
    rightGlasses: z.string(),
    leftGlasses: z.string(),
    pupilDistance: z.string(),
    angleOfView: z.string(),
    nearPointOfConvergence: z.string(),
    depthPerception: z.string(),
  }),
  treatmentNotes: z.string().optional(),
  followupNotes: z.string().optional(),
  prescriptionNotes: z.string().optional(),
});

interface MedicalHistoryFormProps {
  initialValues?: MedicalHistoryFormData;
  onSubmit: (data: MedicalHistoryFormData) => void;
}

export function MedicalHistoryForm({
  initialValues,
  onSubmit,
}: MedicalHistoryFormProps) {
  const defaultValues: MedicalHistoryFormData = {
    date: new Date().toISOString().split("T")[0],
    visionData: {
      rightVision: "",
      leftVision: "",
      rightCylindricalRefraction: "",
      leftCylindricalRefraction: "",
      rightSphericalRefraction: "",
      leftSphericalRefraction: "",
    },
    lensesData: {
      rightGlasses: "",
      leftGlasses: "",
      pupilDistance: "",
      angleOfView: "",
      nearPointOfConvergence: "",
      depthPerception: "",
    },
    treatmentNotes: "",
    followupNotes: "",
    prescriptionNotes: "",
  };

  const form = useForm<MedicalHistoryFormData>({
    resolver: zodResolver(medicalHistorySchema),
    defaultValues: initialValues || defaultValues,
  });

  const handleSubmit = (data: MedicalHistoryFormData) => {
    try {
      onSubmit(data);
      toast.success("הבדיקה הרפואית נשמרה בהצלחה");
    } catch (error) {
      toast.error("שגיאה בשמירת הבדיקה הרפואית");
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="text-right">
              <FormLabel>תאריך הבדיקה:</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4 text-right">נתוני ראייה ורפרקציה</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 md:col-span-1 text-center">
                <h4 className="text-sm font-medium mb-3">בדיקה</h4>
              </div>
              <div className="col-span-3 md:col-span-1 text-center">
                <h4 className="text-sm font-medium mb-3">ימין</h4>
              </div>
              <div className="col-span-3 md:col-span-1 text-center">
                <h4 className="text-sm font-medium mb-3">שמאל</h4>
              </div>

              <div className="col-span-3 md:col-span-1 text-right">
                <p className="text-sm font-medium">חדות ראייה</p>
              </div>
              <FormField
                control={form.control}
                name="visionData.rightVision"
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-1">
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visionData.leftVision"
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-1">
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-3 md:col-span-1 text-right">
                <p className="text-sm font-medium">רפרקציה צילינדרית</p>
              </div>
              <FormField
                control={form.control}
                name="visionData.rightCylindricalRefraction"
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-1">
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visionData.leftCylindricalRefraction"
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-1">
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-3 md:col-span-1 text-right">
                <p className="text-sm font-medium">רפרקציה ספיריקאלית</p>
              </div>
              <FormField
                control={form.control}
                name="visionData.rightSphericalRefraction"
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-1">
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visionData.leftSphericalRefraction"
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-1">
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4 text-right">נתוני משקפיים ופזילה</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 md:col-span-1 text-center">
                <h4 className="text-sm font-medium mb-3">בדיקה</h4>
              </div>
              <div className="col-span-3 md:col-span-1 text-center">
                <h4 className="text-sm font-medium mb-3">ימין</h4>
              </div>
              <div className="col-span-3 md:col-span-1 text-center">
                <h4 className="text-sm font-medium mb-3">שמאל</h4>
              </div>

              <div className="col-span-3 md:col-span-1 text-right">
                <p className="text-sm font-medium">משקפיים</p>
              </div>
              <FormField
                control={form.control}
                name="lensesData.rightGlasses"
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-1">
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lensesData.leftGlasses"
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-1">
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-3 md:col-span-1 text-right">
                <p className="text-sm font-medium">זווית פזילה</p>
              </div>
              <FormField
                control={form.control}
                name="lensesData.angleOfView"
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-2">
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-3 md:col-span-1 text-right">
                <p className="text-sm font-medium">תנועות עיניים</p>
              </div>
              <FormField
                control={form.control}
                name="lensesData.pupilDistance"
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-2">
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-3 md:col-span-1 text-right">
                <p className="text-sm font-medium">ראיית עומק</p>
              </div>
              <FormField
                control={form.control}
                name="lensesData.depthPerception"
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-2">
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-3 md:col-span-1 text-right">
                <p className="text-sm font-medium">Near Point of Convergence</p>
              </div>
              <FormField
                control={form.control}
                name="lensesData.nearPointOfConvergence"
                render={({ field }) => (
                  <FormItem className="col-span-3 md:col-span-2">
                    <FormControl>
                      <Input {...field} dir="rtl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4 text-right">הערות והמלצות</h3>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="treatmentNotes"
                render={({ field }) => (
                  <FormItem className="text-right">
                    <FormLabel>סיכום טיפול:</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="הזן את סיכום הטיפול"
                        dir="rtl"
                        className="min-h-[100px]"
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
                  <FormItem className="text-right">
                    <FormLabel>המלצות למטופל:</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="הזן המלצות למטופל"
                        dir="rtl"
                        className="min-h-[100px]"
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
                  <FormItem className="text-right">
                    <FormLabel>המלצות למרשמים:</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="הזן המלצות למרשמים"
                        dir="rtl"
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="w-full md:w-auto">
            שמור
          </Button>
        </div>
      </form>
    </Form>
  );
}
