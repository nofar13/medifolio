
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Upload, FileSpreadsheet } from "lucide-react";

export const ExcelImport = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast({
        title: "פורמט קובץ לא נתמך",
        description: "אנא העלה קובץ אקסל (.xlsx או .xls)",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // כאן נוסיף את הלוגיקה לעיבוד הקובץ
      const formData = new FormData();
      formData.append('file', file);

      console.log("Uploading file:", file.name);
      console.log("File size:", file.size, "bytes");

      // סימולציה של העלאה
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "קובץ הועלה בהצלחה",
        description: `הקובץ ${file.name} עובד כעת`,
      });

      // איפוס שדה הקובץ
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "שגיאה בהעלאת הקובץ",
        description: "אנא נסה שוב",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          ייבוא מאקסל
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          העלה קובץ אקסל עם נתוני מטופלים. הקובץ צריך להכיל עמודות: תעודת זהות, שם, טלפון, דוא"ל, גיל, מגדר
        </p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="space-y-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
              id="excel-upload"
            />
            <label htmlFor="excel-upload">
              <Button 
                variant="outline" 
                disabled={isUploading}
                className="cursor-pointer"
                asChild
              >
                <span>
                  {isUploading ? "מעלה..." : "בחר קובץ אקסל"}
                </span>
              </Button>
            </label>
            <p className="text-xs text-gray-500">
              נתמכים: .xlsx, .xls (עד 10MB)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
