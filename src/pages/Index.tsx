
import { useEffect } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import RecentPatients from "@/components/Dashboard/RecentPatients";
import UpcomingAppointments from "@/components/Dashboard/UpcomingAppointments";

const Index = () => {
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

  return (
    <MainLayout>
      <div className="main-content opacity-0">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="p-2 bg-primary/10 rounded-lg mr-3">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">מרפאת יונינה - ניהול מרפאת עיניים</h1>
          </div>
          <div className="flex space-x-2 rtl:space-x-reverse mt-4 md:mt-0">
            <Button variant="outline" className="border-gray-300">ייצוא נתונים</Button>
            <Button className="shadow-sm">הוסף מטופל חדש</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="formal-card">
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center mr-4">
                <span className="text-green-600 text-xl font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">תורים להיום</h3>
                <p className="text-muted-foreground">2 הושלמו • 1 ממתין</p>
              </div>
            </CardContent>
          </Card>

          <Card className="formal-card">
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4">
                <span className="text-blue-600 text-xl font-semibold">8</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">תורים מחר</h3>
                <p className="text-muted-foreground">1 דחוף • 7 רגילים</p>
              </div>
            </CardContent>
          </Card>

          <Card className="formal-card">
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 rounded-lg bg-purple-50 flex items-center justify-center mr-4">
                <span className="text-purple-600 text-xl font-semibold">186</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">מטופלים החודש</h3>
                <p className="text-muted-foreground">32 חדשים • 154 חוזרים</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <RecentPatients />
          <UpcomingAppointments />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
