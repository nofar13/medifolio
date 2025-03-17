
import { useState } from "react";
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
import { Eye } from "lucide-react";

type ChecklistItemStatus = "done" | "not-done" | "not-relevant";

export interface ChecklistItem {
  itemId: string;
  status: ChecklistItemStatus;
}

interface TreatmentChecklistProps {
  onChange: (checklist: ChecklistItem[]) => void;
}

// רשימת משימות לטיפול ביתי בעיניים
const homeEyeCareItems = [
  { id: "eyedrops", text: "מעקב טיפות עיניים" },
  { id: "eyepatch", text: "שימוש ברטייה" },
  { id: "blinking", text: "תרגילי עצימת עין" },
  { id: "focusing", text: "תרגילי התמקדות" },
  { id: "distance", text: "תרגילי ראייה למרחק" },
  { id: "rest", text: "הקפדה על מנוחת עיניים" },
  { id: "screentime", text: "הגבלת זמן מסך" },
  { id: "hygiene", text: "שמירה על היגיינת עיניים" }
];

export const TreatmentChecklist = ({ onChange }: TreatmentChecklistProps) => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    homeEyeCareItems.map(item => ({
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
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-4">
        <CardTitle className="text-white flex items-center justify-center">
          <Eye className="ml-2 h-5 w-5" />
          משימות לטיפול ביתי בעיניים
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {homeEyeCareItems.map((item) => {
            const currentItem = checklistItems.find(i => i.itemId === item.id);
            const currentStatus = currentItem ? currentItem.status : "not-done";
            
            return (
              <div key={item.id} className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="font-medium text-blue-700">{item.text}</div>
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
