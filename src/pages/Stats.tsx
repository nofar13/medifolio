
import { MainLayout } from "@/layouts/MainLayout";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, Users, BarChart2, PieChart as PieChartIcon } from "lucide-react";
import { 
  BarChart, 
  PieChart, 
  ResponsiveContainer, 
  Bar, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  LineChart, 
  Line
} from "recharts";

const Stats = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const mainContent = document.querySelector(".main-content");
      if (mainContent) {
        mainContent.classList.add("animate-fadeIn");
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Revenue data
  const revenueData = [
    { month: "ספטמבר", patients: 45000 },
    { month: "אוקטובר", patients: 52000 },
    { month: "נובמבר", patients: 48000 },
    { month: "דצמבר", patients: 60000 },
    { month: "ינואר", patients: 65000 },
    { month: "פברואר", patients: 58000 }
  ];

  // Patient distribution data
  const patientDistributionData = [
    { name: "מטופלים חדשים", value: 40 },
    { name: "מטופלים חוזרים", value: 60 }
  ];

  // Patient count data
  const patientCountData = [
    { month: "ספטמבר", patients: 280 },
    { month: "אוקטובר", patients: 310 },
    { month: "נובמבר", patients: 295 },
    { month: "דצמבר", patients: 270 },
    { month: "ינואר", patients: 320 },
    { month: "פברואר", patients: 305 }
  ];

  // Wait time data
  const waitTimeData = [
    { month: "ספטמבר", minutes: 18 },
    { month: "אוקטובר", minutes: 22 },
    { month: "נובמבר", minutes: 16 },
    { month: "דצמבר", minutes: 19 },
    { month: "ינואר", minutes: 21 }
  ];

  const COLORS = ["#3b82f6", "#10b981"];

  return (
    <MainLayout>
      <div className="main-content opacity-0">
        <div className="flex items-center mb-8">
          <TrendingUp className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold">סטטיסטיקות וניתוח נתונים</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">הכנסות חודשיות</CardTitle>
              </div>
              <CardDescription>הכנסות בששת החודשים האחרונים</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₪${value.toLocaleString()}`, 'הכנסות']} />
                    <Bar dataKey="patients" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Patient Distribution */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">התפלגות מטופלים</CardTitle>
              </div>
              <CardDescription>התפלגות בין מטופלים חדשים וחוזרים</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={patientDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {patientDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Patient Count */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-lg">כמות מטופלים חודשית</CardTitle>
              </div>
              <CardDescription>כמות המטופלים בששת החודשים האחרונים</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={patientCountData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'מטופלים']} />
                    <Bar dataKey="patients" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Wait Time */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">זמן שהיית מטופל</CardTitle>
              </div>
              <CardDescription>זמן ממוצע של שהיית מטופל בדקות</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={waitTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 'dataMax + 5']} />
                    <Tooltip formatter={(value) => [`${value} דקות`, 'זמן שהייה']} />
                    <Line 
                      type="monotone" 
                      dataKey="minutes" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Stats;
