
import { useState } from "react";
import { treatmentChecklistItems } from "@/data/mockData";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type ChecklistItemStatus = "done" | "not-done" | "not-relevant";

export interface ChecklistItem {
  itemId: string;
  status: ChecklistItemStatus;
}

interface TreatmentChecklistProps {
  onChange: (checklist: ChecklistItem[]) => void;
}

export const TreatmentChecklist = ({ onChange }: TreatmentChecklistProps) => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    treatmentChecklistItems.map(item => ({
      itemId: item.id,
      status: "not-done" as ChecklistItemStatus
    }))
  );

  const handleStatusChange = (itemId: string, status: ChecklistItemStatus) => {
    const updatedItems = checklistItems.map(item => 
      item.itemId === itemId ? { ...item, status } : item
    );
    
    setChecklistItems(updatedItems);
    onChange(updatedItems);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>רשימת בדיקות</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {treatmentChecklistItems.map((item) => {
            const currentItem = checklistItems.find(i => i.itemId === item.id);
            const currentStatus = currentItem ? currentItem.status : "not-done";
            
            return (
              <div key={item.id} className="space-y-2">
                <div className="font-medium">{item.text}</div>
                <RadioGroup 
                  value={currentStatus}
                  onValueChange={(value) => handleStatusChange(item.id, value as ChecklistItemStatus)}
                  className="flex space-x-4 rtl:space-x-reverse"
                >
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <RadioGroupItem value="done" id={`done-${item.id}`} />
                    <Label htmlFor={`done-${item.id}`} className="text-green-600">בוצע</Label>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <RadioGroupItem value="not-done" id={`not-done-${item.id}`} />
                    <Label htmlFor={`not-done-${item.id}`} className="text-red-600">לא בוצע</Label>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <RadioGroupItem value="not-relevant" id={`not-relevant-${item.id}`} />
                    <Label htmlFor={`not-relevant-${item.id}`}>לא רלוונטי</Label>
                  </div>
                </RadioGroup>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
