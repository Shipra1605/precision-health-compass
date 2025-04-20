
import React, { useState } from "react";
import TitleSlide from "@/components/presentation/slides/TitleSlide";
import AbstractSlide from "@/components/presentation/slides/AbstractSlide";
import ObjectivesSlide from "@/components/presentation/slides/ObjectivesSlide";
import TechnologySlide from "@/components/presentation/slides/TechnologySlide";
import ArchitectureSlide from "@/components/presentation/slides/ArchitectureSlide";
import WorkflowSlide from "@/components/presentation/slides/WorkflowSlide";
import ApiModelSlide from "@/components/presentation/slides/ApiModelSlide";
import ExampleSlide from "@/components/presentation/slides/ExampleSlide";
import ConclusionSlide from "@/components/presentation/slides/ConclusionSlide";

const slides = [
  { id: 0, component: <TitleSlide /> },
  { id: 1, component: <AbstractSlide /> },
  { id: 2, component: <ObjectivesSlide /> },
  { id: 3, component: <TechnologySlide /> },
  { id: 4, component: <ArchitectureSlide /> },
  { id: 5, component: <WorkflowSlide /> },
  { id: 6, component: <ApiModelSlide /> },
  { id: 7, component: <ExampleSlide /> },
  { id: 8, component: <ConclusionSlide /> },
];

const Presentation = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const goTo = (index: number) => {
    if (index >= 0 && index < slides.length) setSlideIndex(index);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-teal-50 to-white px-0 md:px-20 py-8">
      <div className="w-full max-w-4xl bg-white/80 rounded-xl shadow-lg border p-0 md:p-8 mb-8">
        {slides[slideIndex].component}
      </div>
      <div className="flex gap-2 justify-center mt-2">
        <button
          className="px-4 py-2 rounded bg-teal-600 text-white text-sm font-medium shadow hover:bg-teal-700 transition-colors"
          onClick={() => goTo(slideIndex - 1)}
          disabled={slideIndex === 0}
        >
          Previous
        </button>
        <span className="px-2 text-gray-600 font-mono">
          {slideIndex + 1} / {slides.length}
        </span>
        <button
          className="px-4 py-2 rounded bg-teal-600 text-white text-sm font-medium shadow hover:bg-teal-700 transition-colors"
          onClick={() => goTo(slideIndex + 1)}
          disabled={slideIndex === slides.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Presentation;
