
import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PatientTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  listContent: ReactNode;
  historyContent: ReactNode;
  selectedPatientName?: string;
}

export const PatientTabs = ({ 
  activeTab, 
  onTabChange, 
  listContent, 
  historyContent, 
  selectedPatientName 
}: PatientTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="list">רשימת מטופלים</TabsTrigger>
        <TabsTrigger value="view">
          {selectedPatientName ? `היסטוריה רפואית - ${selectedPatientName}` : 'צפה בהיסטוריה'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="list">
        {listContent}
      </TabsContent>
      
      <TabsContent value="view">
        {historyContent}
      </TabsContent>
    </Tabs>
  );
};
