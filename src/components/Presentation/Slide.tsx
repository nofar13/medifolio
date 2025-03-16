
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Transition } from "@/components/ui/transition";

interface SlideProps {
  title: string;
  content: React.ReactNode;
  index: number;
  slideIndex: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  background?: string;
}

const Slide = ({ 
  title, 
  content, 
  index, 
  slideIndex, 
  totalSlides, 
  onNext, 
  onPrev,
  background
}: SlideProps) => {
  const isActive = index === slideIndex;
  
  const headerStyle = background 
    ? { background } 
    : { background: 'linear-gradient(to right, #3b82f6, #6366f1)' };
  
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
          <CardHeader className="text-white rounded-t-lg p-6" style={headerStyle}>
            <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">{content}</div>
          </CardContent>
          <CardFooter className="p-4 border-t flex justify-between items-center">
            <div className="text-sm text-gray-500">שקופית {index + 1} מתוך {totalSlides}</div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onPrev} 
                disabled={index === 0}
              >
                <ChevronRight className="h-4 w-4 ml-1" />
                הקודם
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onNext} 
                disabled={index === totalSlides - 1}
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

export default Slide;
