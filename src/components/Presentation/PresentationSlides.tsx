
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slide from "./Slide";
import { SlideData } from "./types";

interface PresentationSlidesProps {
  slides: SlideData[];
  slideIndex: number;
  setSlideIndex: (index: number) => void;
}

const PresentationSlides = ({ 
  slides, 
  slideIndex, 
  setSlideIndex 
}: PresentationSlidesProps) => {
  const nextSlide = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  return (
    <div className="relative">
      <div className="space-y-4">
        {slides.map((slide, index) => (
          <Slide
            key={index}
            title={slide.title}
            content={slide.content}
            background={slide.background}
            index={index}
            slideIndex={slideIndex}
            totalSlides={slides.length}
            onNext={nextSlide}
            onPrev={prevSlide}
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
  );
};

export default PresentationSlides;
