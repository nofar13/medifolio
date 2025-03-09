
import { MainLayout } from "@/layouts/MainLayout";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, Users, BarChart2, PieChart as PieChartIcon, Clock } from "lucide-react";
import {
  monthlyPatientsData,
  patientDistributionData,
  patientWaitTimeData
} from "@/data/mockData";
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
  Line, 
  AreaChart,
  Area
} from "recharts";

const Stats = () => {
  useEffect(() => {
    // Simulate loading with a subtle animation
    const timer = setTimeout(() => {
      const mainContent = document.querySelector(".main-content");
      if (mainContent) {
        mainContent.classList.add("animate-fadeIn");
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Custom chart component to replace the Chart component
  const renderChart = (type, data, xAxis, yAxis, height, colors) => {
    if (type === "bar") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yAxis} fill={colors[0]} name={yAxis} />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (type === "pie") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    } else if (type === "line") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(data[0])
              .filter(key => key !== xAxis)
              .map((key, index) => (
                <Line 
                  key={key} 
                  type="monotone" 
                  dataKey={key} 
                  stroke={colors[index % colors.length]} 
                  name={key === "newPatients" ? "מטופלים חדשים" : "מטופלים חוזרים"}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (type === "area") {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="minutes" fill="#8884d8" stroke="#8884d8" name="זמן שהייה (דקות)" />
          </AreaChart>
        </ResponsiveContainer>
      );
    }
    return null;
  };

  // Create more realistic eye clinic patient data from September to February
  const realisticPatientData = [
    { month: "ספטמבר", patients: 280 },
    { month: "אוקטובר", patients: 310 },
    { month: "נובמבר", patients: 295 },
    { month: "דצמבר", patients: 270 },
    { month: "ינואר", patients: 320 },
    { month: "פברואר", patients: 305 }
  ];

  // Revenue data from September to February
  const updatedMonthlyRevenueData = [
    { month: "ספטמבר", patients: 45000 },
    { month: "אוקטובר", patients: 52000 },
    { month: "נובמבר", patients: 48000 },
    { month: "דצמבר", patients: 60000 },
    { month: "ינואר", patients: 65000 },
    { month: "פברואר", patients: 58000 }
  ];

  return (
    <MainLayout>
      <div className="main-content opacity-0">
        <div className="flex items-center mb-8">
          <TrendingUp className="h-10 w-10 text-primary mr-3" />
          <h1 className="text-3xl font-bold">סטטיסטיקות וניתוח נתונים</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Users className="h-5 w-5 text-muted-foreground" />
                <CardTitle>הכנסות חודשיות</CardTitle>
              </div>
              <CardDescription>
                הכנסות בששת החודשים האחרונים
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderChart("bar", updatedMonthlyRevenueData, "month", "patients", 300, ["#8884d8"])}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <PieChartIcon className="h-5 w-5 text-muted-foreground" />
                <CardTitle>התפלגות מטופלים</CardTitle>
              </div>
              <CardDescription>
                התפלגות בין מטופלים חדשים וחוזרים
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderChart("pie", patientDistributionData, "name", "value", 300, ["#0088FE", "#00C49F"])}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Users className="h-5 w-5 text-muted-foreground" />
                <CardTitle>כמות מטופלים חודשית</CardTitle>
              </div>
              <CardDescription>
                כמות המטופלים בששת החודשים האחרונים
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderChart("bar", realisticPatientData, "month", "patients", 300, ["#82ca9d"])}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <CardTitle>זמן שהיית מטופל</CardTitle>
              </div>
              <CardDescription>
                זמן ממוצע של שהיית מטופל בדקות
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderChart("area", patientWaitTimeData, "name", "minutes", 300, ["#82ca9d", "#8884d8"])}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Stats;
