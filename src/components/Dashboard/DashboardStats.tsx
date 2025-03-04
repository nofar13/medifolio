
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, LineChart, PieChart, Pie, Bar, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from "recharts";
import { 
  monthlyPatientsData, patientDistributionData, 
  patientsByDoctorData, patientWaitTimeData 
} from "@/data/mockData";

const DashboardStats = () => {
  const [activeTab, setActiveTab] = useState("הכנסות");
  const COLORS = ["#4ade80", "#60a5fa"];

  return (
    <Tabs defaultValue="הכנסות" className="w-full" onValueChange={setActiveTab}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">סטטיסטיקות מרפאה</h2>
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="הכנסות" className="data-[state=active]:bg-white">הכנסות</TabsTrigger>
          <TabsTrigger value="מטופלים" className="data-[state=active]:bg-white">מטופלים</TabsTrigger>
        </TabsList>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <TabsContent value="הכנסות" className="mt-0 space-y-6">
          <Card className="overflow-hidden hover-lift">
            <CardContent className="p-0">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-right">הכנסות חודשיות</h3>
                <p className="text-muted-foreground text-right">6 חודשים אחרונים</p>
              </div>
              <div className="h-80 w-full p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyPatientsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="patients"
                      stroke="#4ade80"
                      strokeWidth={3}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover-lift">
            <CardContent className="p-0">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-right">כמות מטופלים פר חודש</h3>
                <p className="text-muted-foreground text-right">לפי חודשים</p>
              </div>
              <div className="h-80 w-full p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={patientsByDoctorData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="patients" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="מטופלים" className="mt-0 space-y-6">
          <Card className="overflow-hidden hover-lift">
            <CardContent className="p-0">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-right">זמן שהיית מטופל</h3>
                <p className="text-muted-foreground text-right">בדקות</p>
              </div>
              <div className="h-80 w-full p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={patientWaitTimeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="minutes"
                      stroke="#f472b6"
                      strokeWidth={3}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover-lift">
            <CardContent className="p-0">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-right">השוואת מטופלים</h3>
                <p className="text-muted-foreground text-right">חדשים מול חוזרים</p>
              </div>
              <div className="h-80 w-full p-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={patientDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {patientDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <Card className="overflow-hidden md:col-span-2 hover-lift">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline">ייצא דו"ח</Button>
              <h3 className="text-xl font-semibold">סיכום חודשי</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <p className="text-right text-gray-500 mb-1 text-sm">סה"כ מטופלים</p>
                <p className="text-right text-3xl font-bold">1,240</p>
                <p className="text-right text-green-600 text-sm mt-2">+14% מהחודש הקודם</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-right text-gray-500 mb-1 text-sm">מטופלים חדשים</p>
                <p className="text-right text-3xl font-bold">356</p>
                <p className="text-right text-blue-600 text-sm mt-2">+5% מהחודש הקודם</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <p className="text-right text-gray-500 mb-1 text-sm">הכנסה חודשית</p>
                <p className="text-right text-3xl font-bold">₪125,400</p>
                <p className="text-right text-purple-600 text-sm mt-2">+9% מהחודש הקודם</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <p className="text-right text-gray-500 mb-1 text-sm">פגישות שהושלמו</p>
                <p className="text-right text-3xl font-bold">780</p>
                <p className="text-right text-orange-600 text-sm mt-2">+12% מהחודש הקודם</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Tabs>
  );
};

export default DashboardStats;
