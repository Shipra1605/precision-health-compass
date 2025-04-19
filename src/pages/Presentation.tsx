
import React from 'react';
import PresentationNavigation from '@/components/presentation/PresentationNavigation';
import TitleSlide from '@/components/presentation/slides/TitleSlide';
import AbstractSlide from '@/components/presentation/slides/AbstractSlide';
import ObjectivesSlide from '@/components/presentation/slides/ObjectivesSlide';
import TechnologySlide from '@/components/presentation/slides/TechnologySlide';
import ArchitectureSlide from '@/components/presentation/slides/ArchitectureSlide';
import WorkflowSlide from '@/components/presentation/slides/WorkflowSlide';
import ApiModelSlide from '@/components/presentation/slides/ApiModelSlide';
import ExampleSlide from '@/components/presentation/slides/ExampleSlide';
import ConclusionSlide from '@/components/presentation/slides/ConclusionSlide';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = React.useState(1);
  const totalSlides = 9;

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PresentationNavigation
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onPrevSlide={prevSlide}
          onNextSlide={nextSlide}
        />
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg aspect-[16/9] relative overflow-hidden">
          {currentSlide === 1 && <TitleSlide />}
          {currentSlide === 2 && <AbstractSlide />}
          {currentSlide === 3 && <ObjectivesSlide />}
          {currentSlide === 4 && <TechnologySlide />}
          {currentSlide === 5 && <ArchitectureSlide />}
          {currentSlide === 6 && <WorkflowSlide />}
          {currentSlide === 7 && <ApiModelSlide />}
          {currentSlide === 8 && <ExampleSlide />}
          {currentSlide === 9 && <ConclusionSlide />}
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                className={`h-2 w-2 rounded-full ${
                  currentSlide === i + 1 ? 'bg-teal-600' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(i + 1)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
