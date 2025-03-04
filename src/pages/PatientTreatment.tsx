import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { medicalHistories, patients } from "@/data/mockData";
import { MedicalHistory, Patient } from "@/types";
import { FilePlus, Eye } from "lucide-react";

const formSchema = z.object({
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

const PatientTreatment = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [histories, setHistories] = useState<MedicalHistory[]>([]);

  useEffect(() => {
    if (patientId) {
      const foundPatient = patients.find(p => p.id === patientId);
      if (foundPatient) {
        setPatient(foundPatient);
        const patientHistories = medicalHistories.filter(h => h.patientId === patientId);
        setHistories(patientHistories);
      } else {
        toast({
          title: "שגיאה",
          description: "המטופל לא נמצא",
          variant: "destructive",
        });
        navigate("/patients");
      }
    }
    
    const timer = setTimeout(() => {
      const mainContent = document.querySelector(".main-content");
      if (mainContent) {
        mainContent.classList.add("animate-fadeIn");
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [patientId, navigate]);

  const navigateToCurrentTreatment = () => {
    if (patientId) {
      navigate(`/patients/${patientId}/current-treatment`);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!patient) return;
    
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
      treatmentNotes: data.treatmentNotes || "",
      followupNotes: data.followupNotes || "",
      prescriptionNotes: data.prescriptionNotes || ""
    };
    
    setHistories(prev => [newHistory, ...prev]);
    
    toast({
      title: "טיפול נרשם בהצלחה",
      description: "פרטי הטיפול נשמרו בהיסטוריית המטופל",
    });
    
    form.reset();
  };

  if (!patient) {
    return <MainLayout>
      <div className="flex justify-center items-center h-full">
        <p>טוען...</p>
      </div>
    </MainLayout>;
  }

  return (
    <MainLayout>
      <div className="main-content opacity-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">טיפול חדש</h1>
          <div className="flex gap-2">
            <Button 
              onClick={navigateToCurrentTreatment} 
              className="mr-2"
              variant="default"
            >
              <FilePlus className="ml-2 h-4 w-4" />
              טיפול נוכחי
            </Button>
            <Button variant="outline" onClick={() => navigate("/patients")}>
              חזרה לרשימת המטופלים
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>פרטי מטופל: {patient.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">תעודת זהות</p>
                  <p>{patient.idNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">גיל</p>
                  <p>{patient.age}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">מגדר</p>
                  <p>{patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">טלפון</p>
                  <p>{patient.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">דוא"ל</p>
                  <p>{patient.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">הערות</p>
                  <p>{patient.additionalNotes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="new-treatment">
          <TabsList className="mb-4">
            <TabsTrigger value="new-treatment">טיפול חדש</TabsTrigger>
            <TabsTrigger value="history">היסטוריית טיפולים</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new-treatment">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                              <Input placeholder="פרטי הטיפול והמלצות..." {...field} />
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
                              <Input placeholder="פרטים למעקב בעתיד..." {...field} />
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
                              <Input placeholder="פרטי מרשם שניתן..." {...field} />
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
          </TabsContent>
          
          <TabsContent value="history">
            {histories.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p>אין היסטוריית טיפולים למטופל זה</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {histories.map((history, index) => (
                  <Card key={history.id}>
                    <CardHeader>
                      <CardTitle>טיפול מתאריך {history.date}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">נתוני ראייה</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">חדות ראייה</p>
                              <p>ימין: {history.visionData.rightVision}</p>
                              <p>שמאל: {history.visionData.leftVision}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">שבירה צילינדרית</p>
                              <p>ימין: {history.visionData.rightCylindricalRefraction}</p>
                              <p>שמאל: {history.visionData.leftCylindricalRefraction}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">שבירה ספרית</p>
                              <p>ימין: {history.visionData.rightSphericalRefraction}</p>
                              <p>שמאל: {history.visionData.leftSphericalRefraction}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">נתוני עדשות</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">משקפיים</p>
                              <p>ימין: {history.lensesData.rightGlasses}</p>
                              <p>שמאל: {history.lensesData.leftGlasses}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">פרמטרים נוספים</p>
                              <p>מרחק אישונים: {history.lensesData.pupilDistance}</p>
                              <p>זווית מבט: {history.lensesData.angleOfView}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">מדדים נוספים</p>
                              <p>נק' התכנסות: {history.lensesData.nearPointOfConvergence}</p>
                              <p>תפיסת עומק: {history.lensesData.depthPerception}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">הערות</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">הערות טיפול</p>
                              <p>{history.treatmentNotes}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">הערות למעקב</p>
                              <p>{history.followupNotes}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">מרשם</p>
                              <p>{history.prescriptionNotes}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PatientTreatment;
