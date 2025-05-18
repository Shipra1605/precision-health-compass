
import React from 'react';
import { HeartPulse, Brain, Zap } from 'lucide-react'; // Using Zap for a subtle AI/tech feel

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  textColor?: string;
  wrapperClassName?: string;
  // Icon colors can be controlled by the gradient background or specific classes if needed
}

const Logo: React.FC<LogoProps> = ({
  size = "xl",
  textColor = "text-brand-navy dark:text-brand-pearl-gray-light",
  wrapperClassName = "",
}) => {
  let containerSizeClass = 'w-12 h-12'; // for xl
  let iconMainSize = 22; // HeartPulse
  let iconSubSize = 10;  // Brain, Zap
  let textSizeClass = 'text-xl';
  let textOffsetClass = 'ml-2'; // Space between icon and text
  let brainPosition = 'top-1.5 right-1.5';
  let zapPosition = 'bottom-1.5 left-1.5';

  if (size === 'lg') {
    containerSizeClass = 'w-10 h-10';
    iconMainSize = 20;
    iconSubSize = 9;
    textSizeClass = 'text-lg';
    brainPosition = 'top-1 right-1';
    zapPosition = 'bottom-1 left-1';
  } else if (size === 'md') {
    containerSizeClass = 'w-9 h-9';
    iconMainSize = 18;
    iconSubSize = 8;
    textSizeClass = 'text-base';
    brainPosition = 'top-0.5 right-0.5';
    zapPosition = 'bottom-0.5 left-0.5';
  } else if (size === 'sm') {
    containerSizeClass = 'w-8 h-8';
    iconMainSize = 16;
    iconSubSize = 7;
    textSizeClass = 'text-sm';
    textOffsetClass = 'ml-1.5';
    brainPosition = 'top-0.5 right-0.5';
    zapPosition = 'bottom-0.5 left-0.5';
  }

  return (
    <div className={`flex items-center group transition-transform duration-300 ease-out hover:scale-105 ${wrapperClassName}`}>
      <div
        className={`relative flex items-center justify-center rounded-lg shadow-md 
                   ${containerSizeClass}
                   bg-gradient-to-br from-brand-teal via-sky-500 to-blue-600 
                   dark:from-teal-500 dark:via-sky-600 dark:to-blue-700
                   group-hover:shadow-lg group-hover:brightness-110 transition-all duration-300`}
      >
        <HeartPulse
          size={iconMainSize}
          className="text-white z-10 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={2}
        />
        <Brain
          size={iconSubSize}
          className={`text-white/70 absolute ${brainPosition} opacity-80 z-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-[-6deg]`}
          strokeWidth={1.5}
        />
        <Zap // Representing AI/technology aspect from the sketch's circuitry feel
          size={iconSubSize}
          className={`text-white/70 absolute ${zapPosition} opacity-70 z-0 transition-all duration-300 group-hover:opacity-90 group-hover:rotate-[6deg]`}
          strokeWidth={1.5}
        />
      </div>
      <span className={`font-bold ${textColor} ${textSizeClass} ${textOffsetClass} font-heading leading-tight tracking-tight whitespace-nowrap`}>
        MediCare AI
      </span>
    </div>
  );
};

export default Logo;
