import { MainLayout } from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appointments as initialAppointments } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Appointment } from "@/types";
import AddAppointmentForm from "@/components/Appointments/AddAppointmentForm";
import { isBefore, parseISO, startOfDay } from "date-fns";

const Appointments = () => {
  const [filter, setFilter] = useState<"all" | "scheduled" | "completed">("all");
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  const handleAppointmentAdded = (newAppointment: Appointment) => {
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
  };
  
  const validAppointments = appointments.filter(appointment => {
    const appointmentDate = parseISO(appointment.date);
    return appointment.status === "completed" || !isBefore(appointmentDate, startOfDay(new Date()));
  });
  
  const filteredAppointments = validAppointments.filter(appointment => {
    if (filter === "all") return true;
    return appointment.status === filter;
  });

  return (
    <MainLayout>
      <div className="animate-fadeIn">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">ניהול פגישות</h1>
          <AddAppointmentForm onAppointmentAdded={handleAppointmentAdded} />
        </div>
        
        <div className="flex justify-end mb-4 space-x-2 rtl:space-x-reverse">
          <Button 
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            הכל
          </Button>
          <Button 
            variant={filter === "scheduled" ? "default" : "outline"}
            onClick={() => setFilter("scheduled")}
            className={filter === "scheduled" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            מתוכננות
          </Button>
          <Button 
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
            className={filter === "completed" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            הושלמו
          </Button>
        </div>
        
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-4">
            <CardTitle className="text-xl text-right text-white">לוח פגישות</CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">פעולות</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">הערות</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">סטטוס</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">שעה</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">תאריך</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">שם מטופל</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">ערוך</Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">בטל</Button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">{appointment.notes}</td>
                        <td className="py-4 px-4 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            appointment.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {appointment.status === 'completed' ? 'הושלם' : 'מתוכנן'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">{appointment.time}</td>
                        <td className="py-4 px-4 text-right">{appointment.date}</td>
                        <td className="py-4 px-4 text-right font-medium">{appointment.patientName}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        אין פגישות להצגה עם הסינון הנוכחי
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Appointments;
