
import { SlideData } from "./types";

export const slidesData: SlideData[] = [
  {
    title: "הבעיה המוצגת במאמר",
    content: (
      <div className="space-y-4" dir="rtl">
        <p>המאמר עוסק בחשיבות מערכות מידע בזמן מגפות, תוך התמקדות במגפת COVID-19.</p>
        <p>הבעיה המרכזית היא כיצד מערכות מידע משפיעות על ניהול משברים בריאותיים, וכיצד הן מסייעות, או מפריעות, לממשלות, ארגונים ואנשים פרטיים בהתמודדות עם המגפה.</p>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">אתגרים מרכזיים:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>הצפת מידע שגוי ("אינפודמיה") ברשתות החברתיות</li>
            <li>חוסר יכולת למדוד את הערך של מערכות מידע בהצלחת ההתמודדות עם המגפה</li>
            <li>חששות מפרטיות ושימוש במערכות מידע ככלי למעקב ממשלתי</li>
            <li>השפעת מגמות דיגיטליות (עבודה מרחוק, מסחר אונליין, חינוך דיגיטלי) על החברה</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "יישומים במציאות של הבעיה והמודל",
    content: (
      <div className="space-y-4" dir="rtl">
        <ul className="list-none space-y-4">
          <li className="flex items-start">
            <span className="text-blue-500 font-bold ml-2">🔹</span>
            <span><strong>מערכות מידע לניהול מגפה:</strong> אפליקציות מעקב כמו "המגן", שימוש באנליטיקה לניבוי התפשטות הנגיף, ומודלים לחיזוי העומס על בתי החולים.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-bold ml-2">🔹</span>
            <span><strong>ביג דאטה וממשל:</strong> מדינות רבות השתמשו בניתוח נתונים בזמן אמת כדי להתאים את המדיניות שלהן (למשל, חיזוי גלים עתידיים של הדבקה).</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-bold ml-2">🔹</span>
            <span><strong>אוטומציה ומסחר דיגיטלי:</strong> מעבר משמעותי של עסקים לפלטפורמות דיגיטליות בעקבות הגבלות פיזיות.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    title: "התרומה של המאמר על ספרות קודמת",
    content: (
      <div className="space-y-4" dir="rtl">
        <p>המאמר מרחיב את ההבנה לגבי תפקיד מערכות מידע בזמן מגפה, מעבר לשימושים קלאסיים כמו ניהול נתונים.</p>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">חדשנות מחקרית:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>הדגשה של הסכנות בשימוש במערכות מידע כמו ניצולן לשליטה באזרחים</li>
            <li>הצגת שאלות אתיות חדשות – האם מדינות ינצלו את "אפליקציות המעקב" גם לאחר המגפה?</li>
            <li>חיבור בין טכנולוגיה, התנהגות אנושית וממשל בזמן משבר</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    title: "הכלים שבהם המאמר משתמש",
    content: (
      <div className="space-y-4" dir="rtl">
        <ul className="list-disc list-inside space-y-3">
          <li>סקירת ספרות של מחקרים קודמים על שימוש במערכות מידע במשברים גלובליים</li>
          <li>ניתוח מגמות בהתפתחות השימוש בטכנולוגיה במהלך המגפה ואחריה</li>
          <li>השוואת מודלים של שימוש במידע במדינות שונות והשפעתו על ניהול המשבר</li>
        </ul>
      </div>
    )
  },
  {
    title: "תוצאות עיקריות",
    content: (
      <div className="space-y-4" dir="rtl">
        <ul className="list-none space-y-4">
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>מערכות מידע היו קריטיות במאבק ב-COVID-19, אבל גם גרמו לתופעות שליליות כמו הפצת מידע שגוי.</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>אזרחים נעשו "מדעני נתונים" – אנשים למדו לנתח גרפים וסטטיסטיקות הקשורות להדבקה.</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>הממשלות חייבות למצוא איזון בין שימוש בטכנולוגיה לשיפור ניהול המשבר לבין שמירה על פרטיות האזרחים.</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>לטווח הארוך, שימוש יתר במעקב דיגיטלי עלול לגרום להשפעות שליליות על חופש הפרט.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    title: "מסקנות מהמאמר",
    content: (
      <div className="space-y-4" dir="rtl">
        <ul className="list-none space-y-4">
          <li className="flex items-start">
            <span className="text-blue-500 font-bold ml-2">🔹</span>
            <span>מערכות מידע שיחקו תפקיד מרכזי בניהול משבר הקורונה, אך יש לנהל אותן בזהירות כדי להימנע מניצול יתר של טכנולוגיות מעקב.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-bold ml-2">🔹</span>
            <span>המדדים להצלחת מערכות מידע בתקופת מגפה צריכים להיות רב-ממדיים, כולל לא רק בריאות, אלא גם השפעה כלכלית, חברתית, ואתית.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 font-bold ml-2">🔹</span>
            <span>מחקר עתידי נדרש על ההשפעות ארוכות הטווח של הדיגיטציה המואצת בזמן המגפה.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    title: "מחקר המשך עתידי",
    content: (
      <div className="space-y-4" dir="rtl">
        <p className="flex items-center mb-4">
          <span className="text-indigo-500 font-bold text-xl ml-2">💡</span>
          <span className="font-semibold">שאלות פתוחות שדורשות חקירה נוספת:</span>
        </p>
        
        <ul className="list-none space-y-3">
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>כיצד ניתן לשפר את ניהול המידע בזמן משבר כדי למנוע הפצת מידע שגוי?</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>איך אפשר לשלב מערכות מידע לניהול משברים בלי לפגוע בפרטיות?</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>כיצד ייראה תפקידה של הטכנולוגיה בעתיד – האם מגמות כמו עבודה מרחוק ומעקב דיגיטלי יהפכו לסטנדרט?</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 font-bold ml-2">✔</span>
            <span>מהן ההשפעות ארוכות הטווח של האצת השימוש במערכות מידע על שוק העבודה, כלכלה, ומבנה החברה?</span>
          </li>
        </ul>
      </div>
    )
  }
];
