
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { SlideData } from "./types";

interface PresentationCarouselProps {
  slides: SlideData[];
}

const PresentationCarousel = ({ slides }: PresentationCarouselProps) => {
  return (
    <Carousel className="max-w-5xl mx-auto">
      <CarouselContent>
        {slides.map((slide, index) => {
          const headerStyle = slide.background 
            ? { background: slide.background } 
            : { background: 'linear-gradient(to right, #3b82f6, #6366f1)' };
            
          return (
            <CarouselItem key={index}>
              <Card className="border shadow-md">
                <CardHeader className="text-white" style={headerStyle}>
                  <CardTitle>{slide.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {slide.content}
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="flex justify-center mt-4">
        <CarouselPrevious className="relative inset-0 translate-y-0 mr-2" />
        <CarouselNext className="relative inset-0 translate-y-0 ml-2" />
      </div>
    </Carousel>
  );
};

export default PresentationCarousel;
