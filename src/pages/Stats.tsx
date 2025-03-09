
import { MainLayout } from "@/layouts/MainLayout";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, Users, BarChart2 } from "lucide-react";
import {
  monthlyPatientsData,
  patientDistributionData,
  patientWaitTimeData,
} from "@/data/mockData";
import { BarChart, PieChart, ResponsiveContainer, Bar, Pie, Cell, Tooltip, Legend, XAxis, YAxis, CartesianGrid } from "recharts";

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
    }
    return null;
  };

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
              {renderChart("bar", monthlyPatientsData, "month", "patients", 300, ["#8884d8"])}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Users className="h-5 w-5 text-muted-foreground" />
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
              {renderChart("bar", monthlyPatientsData, "month", "patients", 300, ["#8884d8"])}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <BarChart2 className="h-5 w-5 text-muted-foreground" />
                <CardTitle>זמן שהיית מטופל</CardTitle>
              </div>
              <CardDescription>
                זמן שהייה ממוצע של מטופל (בדקות)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderChart("bar", patientWaitTimeData, "name", "minutes", 300, ["#82ca9d"])}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Stats;
