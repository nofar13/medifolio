
import { MainLayout } from "@/layouts/MainLayout";
import { BarChart, FileBar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import DashboardStats from "@/components/Dashboard/DashboardStats";

const Stats = () => {
  return (
    <MainLayout>
      <div className="main-content animate-fadeIn">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center">
            <BarChart className="h-10 w-10 text-primary mr-3 icon-glow" />
            <h1 className="text-3xl font-bold">סטטיסטיקות מרפאה</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-lift">
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <span className="text-green-600 text-xl font-bold">15%</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">גידול במספר מטופלים</h3>
                <p className="text-muted-foreground">בהשוואה לחודש קודם</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-blue-600 text-xl font-bold">42</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">ממוצע מטופלים שבועי</h3>
                <p className="text-muted-foreground">מתוך 6 שבועות אחרונים</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <span className="text-purple-600 text-xl font-bold">₪9.5K</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">הכנסה חודשית ממוצעת</h3>
                <p className="text-muted-foreground">3 חודשים אחרונים</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <DashboardStats />
      </div>
    </MainLayout>
  );
};

export default Stats;
