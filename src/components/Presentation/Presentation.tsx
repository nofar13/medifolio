
import { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, List, Presentation as PresentationIcon } from "lucide-react";
import { Transition } from "@/components/ui/transition";

interface SlideProps {
  title: string;
  content: React.ReactNode;
  index: number;
  slideIndex: number;
}

const Slide = ({ title, content, index, slideIndex }: SlideProps) => {
  const isActive = index === slideIndex;
  
  return (
    <Transition 
      show={isActive}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex justify-center items-center min-h-[500px]">
        <Card className="w-full max-w-4xl bg-white shadow-formal">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg p-6">
            <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">{content}</div>
          </CardContent>
          <CardFooter className="p-4 border-t flex justify-between items-center">
            <div className="text-sm text-gray-500">שקופית {index + 1} מתוך 7</div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {}} 
                disabled={index === 0}
              >
                <ChevronRight className="h-4 w-4 ml-1" />
                הקודם
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {}} 
                disabled={index === 6}
              >
                הבא
                <ChevronLeft className="h-4 w-4 mr-1" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Transition>
  );
};

const Presentation = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isCarouselView, setIsCarouselView] = useState(false);

  const nextSlide = () => {
    if (slideIndex < 6) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  const slides = [
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      prevSlide();
    } else if (e.key === "ArrowLeft") {
      nextSlide();
    }
  };

  return (
    <div 
      className="relative py-8" 
      tabIndex={0} 
      onKeyDown={handleKeyDown}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PresentationIcon className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-blue-800">מצגת: מערכות מידע בזמן מגפת COVID-19</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCarouselView(!isCarouselView)}
              className="flex items-center gap-1"
            >
              {isCarouselView ? <PresentationIcon className="h-4 w-4" /> : <List className="h-4 w-4" />}
              <span>{isCarouselView ? "תצוגת מצגת" : "תצוגת גלריה"}</span>
            </Button>
          </div>
        </div>

        {isCarouselView ? (
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <Card className="border shadow-md">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                      <CardTitle>{slide.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      {slide.content}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative inset-0 translate-y-0 mr-2" />
              <CarouselNext className="relative inset-0 translate-y-0 ml-2" />
            </div>
          </Carousel>
        ) : (
          <div className="relative">
            <div className="space-y-4">
              {slides.map((slide, index) => (
                <Slide
                  key={index}
                  title={slide.title}
                  content={slide.content}
                  index={index}
                  slideIndex={slideIndex}
                />
              ))}
            </div>
            
            <div className="flex justify-center mt-8 space-x-4 rtl:space-x-reverse">
              <Button
                onClick={prevSlide}
                disabled={slideIndex === 0}
                className="flex items-center gap-1"
              >
                <ChevronRight className="h-5 w-5" />
                הקודם
              </Button>
              <div className="flex items-center">
                {slides.map((_, index) => (
                  <Button
                    key={index}
                    variant={slideIndex === index ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-8 p-0 mx-1"
                    onClick={() => setSlideIndex(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              <Button
                onClick={nextSlide}
                disabled={slideIndex === slides.length - 1}
                className="flex items-center gap-1"
              >
                הבא
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Presentation;
