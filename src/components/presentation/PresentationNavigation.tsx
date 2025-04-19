
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PresentationNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
}

const PresentationNavigation: React.FC<PresentationNavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrevSlide,
  onNextSlide,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Link to="/">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Button>
      </Link>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onPrevSlide}
          disabled={currentSlide === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <span className="text-sm">
          Slide {currentSlide} of {totalSlides}
        </span>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onNextSlide}
          disabled={currentSlide === totalSlides}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PresentationNavigation;
