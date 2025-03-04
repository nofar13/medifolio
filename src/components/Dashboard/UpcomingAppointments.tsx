
import { useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { appointments } from "@/data/mockData";
import { Calendar, ChevronLeft, Clock, UserX } from "lucide-react";

const UpcomingAppointments = () => {
  const [view, setView] = useState<"today" | "all">("today");
  
  const todayAppointments = appointments.filter(
    appointment => appointment.status === "scheduled" && 
    new Date(appointment.date).toDateString() === new Date().toDateString()
  );
  
  const displayedAppointments = view === "today" ? todayAppointments : appointments;

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">מתוכנן</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">הושלם</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">בוטל</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="hover-lift">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button 
              variant={view === "today" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setView("today")}
            >
              היום
            </Button>
            <Button 
              variant={view === "all" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setView("all")}
            >
              הכל
            </Button>
          </div>
          <h3 className="text-xl font-semibold">תורים קרובים</h3>
        </div>

        {displayedAppointments.length === 0 ? (
          <div className="py-8 text-center">
            <UserX className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">אין תורים מתוכננים להיום</p>
            <p className="text-gray-400 text-sm mt-1">כל התורים המתוכננים יופיעו כאן</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedAppointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
              >
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <div className="text-right">
                    <p className="font-medium">{appointment.patientName}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4 rtl:space-x-reverse">
                      <span>{format(new Date(appointment.date), "dd/MM/yyyy")}</span>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {getStatusBadge(appointment.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-3">
        <Button variant="outline" size="sm" className="ml-auto text-xs">
          נהל תורים
          <ChevronLeft className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingAppointments;
