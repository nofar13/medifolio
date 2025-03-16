
import { useState } from "react";
import { List, Presentation as PresentationIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import PresentationCarousel from "./PresentationCarousel";
import PresentationSlides from "./PresentationSlides";
import { slidesData } from "./slidesData";

const Presentation = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isCarouselView, setIsCarouselView] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      if (slideIndex > 0) {
        setSlideIndex(slideIndex - 1);
      }
    } else if (e.key === "ArrowLeft") {
      if (slideIndex < slidesData.length - 1) {
        setSlideIndex(slideIndex + 1);
      }
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
          <PresentationCarousel slides={slidesData} />
        ) : (
          <PresentationSlides 
            slides={slidesData} 
            slideIndex={slideIndex} 
            setSlideIndex={setSlideIndex} 
          />
        )}
      </div>
    </div>
  );
};

export default Presentation;
