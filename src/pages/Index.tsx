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
            <Eye className="h-10 w-10 text-primary mr-3 icon-glow" />
            <h1 className="text-3xl font-bold">מרפאת יונינה - ניהול מרפאת עיניים</h1>
          </div>
          <div className="flex space-x-2 rtl:space-x-reverse mt-4 md:mt-0">
            <Button variant="outline">ייצוא נתונים</Button>
            <Button>הוסף מטופל חדש</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover-lift">
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <span className="text-green-600 text-xl font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">תורים להיום</h3>
                <p className="text-muted-foreground">2 הושלמו | 1 ממתין</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-blue-600 text-xl font-bold">8</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">תורים מחר</h3>
                <p className="text-muted-foreground">1 דחוף | 7 רגילים</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6 flex items-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <span className="text-purple-600 text-xl font-bold">186</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">מטופלים החודש</h3>
                <p className="text-muted-foreground">32 חדשים | 154 חוזרים</p>
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
