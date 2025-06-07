
import { MainLayout } from "@/layouts/MainLayout";
import { PageAnimation } from "@/components/UI/PageAnimation";
import { DatabaseSetup } from "@/components/Database/DatabaseSetup";
import { ExcelImport } from "@/components/Database/ExcelImport";

const DatabaseManagement = () => {
  return (
    <MainLayout>
      <PageAnimation>
        <div className="space-y-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">ניהול מסד נתונים</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DatabaseSetup />
            <ExcelImport />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">הוראות שימוש</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>תחילה לחץ על "צור טבלאות במסד הנתונים" כדי להכין את המסד</li>
              <li>הכן קובץ אקסל עם העמודות הבאות: תעודת זהות, שם, טלפון, דוא"ל, גיל, מגדר</li>
              <li>העלה את הקובץ באמצעות כפתור "ייבוא מאקסל"</li>
              <li>הנתונים יובאו אוטומטית למערכת</li>
            </ol>
          </div>
        </div>
      </PageAnimation>
    </MainLayout>
  );
};

export default DatabaseManagement;
