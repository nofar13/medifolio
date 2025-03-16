
import { SlideData } from "./types";

export const slidesData: SlideData[] = [
  {
    title: "עיצוב מודרני בעידן הדיגיטלי",
    background: "linear-gradient(to right, #6366f1, #8b5cf6)",
    content: (
      <div className="space-y-4" dir="rtl">
        <p className="text-lg">עיצוב מודרני שם דגש על פשטות, פונקציונליות ואסתטיקה נקייה.</p>
        <p>בעידן הדיגיטלי, העיצוב המודרני עובר אבולוציה מתמדת המשלבת טכנולוגיות חדשות עם עקרונות קלאסיים.</p>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">עקרונות מרכזיים:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>מינימליזם ופונקציונליות</li>
            <li>טיפוגרפיה נקייה ונגישה</li>
            <li>מרחב שלילי (white space) כאלמנט עיצובי</li>
            <li>פלטת צבעים מוגבלת ומדויקת</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "מגמות עיצוב ב-2024",
    background: "linear-gradient(to right, #8b5cf6, #ec4899)",
    content: (
      <div className="space-y-4" dir="rtl">
        <ul className="list-none space-y-4">
          <li className="flex items-start">
            <span className="text-purple-500 font-bold ml-2">🔹</span>
            <span><strong>ניאומורפיזם:</strong> סגנון עיצוב המשלב אלמנטים שטוחים עם אפקטים תלת-ממדיים עדינים, יוצר תחושה של רכות ומישוש.</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 font-bold ml-2">🔹</span>
            <span><strong>מודים כהים:</strong> עיצובים בגוונים כהים הופכים לסטנדרט, מפחיתים עומס על העיניים ומשפרים צריכת סוללה.</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-500 font-bold ml-2">🔹</span>
            <span><strong>מיקרו-אנימציות:</strong> תנועות קטנות ועדינות המשפרות את חווית המשתמש ומוסיפות תחושת חיוניות לממשק.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    title: "שילוב של AI בעיצוב",
    background: "linear-gradient(to right, #ec4899, #f97316)",
    content: (
      <div className="space-y-4" dir="rtl">
        <p>בינה מלאכותית משנה את עולם העיצוב הדיגיטלי ומציעה אפשרויות חדשות למעצבים ולמפתחים.</p>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">יתרונות השימוש ב-AI:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>אוטומציה של משימות חוזרות ושגרתיות</li>
            <li>סיוע ביצירת גרסאות מרובות של עיצובים</li>
            <li>ניתוח נתוני משתמשים לשיפור חוויית המשתמש</li>
            <li>יצירת תוכן חזותי מותאם אישית בקנה מידה רחב</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "עיצוב נגיש לכולם",
    background: "linear-gradient(to right, #f97316, #eab308)",
    content: (
      <div className="space-y-4" dir="rtl">
        <ul className="list-disc list-inside space-y-3">
          <li>נגישות היא חלק בלתי נפרד מעיצוב מודרני ואיכותי</li>
          <li>ניגודיות צבעים גבוהה מאפשרת קריאות טובה יותר</li>
          <li>מבנה היררכי ברור מסייע בהתמצאות בממשק</li>
          <li>תמיכה בהגדלת טקסט ובקוראי מסך</li>
        </ul>
      </div>
    )
  },
  {
    title: "עיצוב רספונסיבי",
    background: "linear-gradient(to right, #eab308, #22c55e)",
    content: (
      <div className="space-y-4" dir="rtl">
        <ul className="list-none space-y-4">
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>עיצוב רספונסיבי מבטיח חוויה מיטבית בכל גודל מסך - ממכשירים ניידים ועד למסכים גדולים.</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>השימוש ב-CSS Grid ו-Flexbox הפך את הפיתוח הרספונסיבי לנגיש ופשוט יותר.</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>גישת "Mobile First" מבטיחה חוויה אופטימלית במכשירים ניידים לפני הרחבה למסכים גדולים יותר.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    title: "מינימליזם בעיצוב",
    background: "linear-gradient(to right, #22c55e, #0ea5e9)",
    content: (
      <div className="space-y-4" dir="rtl">
        <ul className="list-none space-y-4">
          <li className="flex items-start">
            <span className="text-blue-500 font-bold ml-2">🔹</span>
            <span>״פחות הוא יותר״ - עיצוב מינימליסטי מתמקד באלמנטים החיוניים תוך הסרת כל מה שמיותר.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-bold ml-2">🔹</span>
            <span>שימוש במרחב לבן (white space) מאפשר לתוכן ״לנשום״ ומשפר את הקריאות והמיקוד.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-bold ml-2">🔹</span>
            <span>פלטת צבעים מצומצמת יוצרת אחידות ומאפשרת לתוכן המהותי לבלוט.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    title: "מגמות עתידיות בעיצוב",
    background: "linear-gradient(to right, #0ea5e9, #3b82f6)",
    content: (
      <div className="space-y-4" dir="rtl">
        <p className="flex items-center mb-4">
          <span className="text-indigo-500 font-bold text-xl ml-2">💡</span>
          <span className="font-semibold">לאן פני העיצוב הדיגיטלי בשנים הקרובות?</span>
        </p>
        
        <ul className="list-none space-y-3">
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>ממשקים מבוססי קול וג׳סטות ללא מגע יהפכו נפוצים יותר</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>מציאות רבודה (AR) ומציאות מדומה (VR) ישתלבו יותר בחוויות הדיגיטליות היומיומיות</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>עיצוב מותאם אישית דינמית באמצעות AI יהפוך לסטנדרט</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>שילוב גדל והולך בין עיצוב פיזי ודיגיטלי בחיי היומיום</span>
          </li>
        </ul>
      </div>
    )
  }
];
