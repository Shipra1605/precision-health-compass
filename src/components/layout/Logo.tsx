
import React from 'react';
import { Stethoscope, Brain, HeartPulse } from 'lucide-react'; // Added HeartPulse

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  textColor?: string;
  wrapperClassName?: string;
  iconColor?: string; // For overriding default icon colors if needed
}

const Logo: React.FC<LogoProps> = ({ 
  size = "xl", 
  textColor = "text-navy-700", // Updated to new palette
  wrapperClassName = "",
  iconColor = "text-white"
}) => {
  // Base sizes
  let iconMainSize = 24; // for Stethoscope
  let iconSubSize = 10;  // for Brain/Heart
  let textSize = 'text-xl';
  let containerPadding = 'p-2.5'; // Control overall icon container size via padding
  let brainOffset = 'top-1 right-1';
  let heartOffset = 'top-1.5 left-1.5';

  if (size === 'lg') {
    iconMainSize = 20;
    iconSubSize = 8;
    textSize = 'text-lg';
    containerPadding = 'p-2';
    brainOffset = 'top-0.5 right-0.5';
    heartOffset = 'top-1 left-1';
  } else if (size === 'md') {
    iconMainSize = 18;
    iconSubSize = 7;
    textSize = 'text-base';
    containerPadding = 'p-1.5';
    brainOffset = 'top-0.5 right-0.5';
    heartOffset = 'top-0.5 left-0.5';
  } else if (size === 'sm') {
    iconMainSize = 16;
    iconSubSize = 6;
    textSize = 'text-sm';
    containerPadding = 'p-1';
    brainOffset = 'top-0 right-0';
    heartOffset = 'top-0.5 left-0.5';
  }

  return (
    <div className={`flex items-center gap-2 group transition-transform duration-300 ease-out hover:scale-105 ${wrapperClassName}`}>
      <div 
        className={`relative flex items-center justify-center rounded-lg shadow-md ${containerPadding} 
                   bg-gradient-to-br from-teal-500 via-sky-500 to-blue-600 
                   group-hover:from-teal-400 group-hover:via-sky-400 group-hover:to-blue-500 transition-all duration-300`}
      >
        <Stethoscope size={iconMainSize} className={`${iconColor} z-10 transition-transform duration-300 group-hover:rotate-[-6deg]`} strokeWidth={2}/>
        <Brain 
            size={iconSubSize} 
            className={`${iconColor} absolute ${brainOffset} opacity-70 z-0 transition-all duration-300 group-hover:opacity-90 group-hover:scale-110`} 
            strokeWidth={1.5}
        />
         <HeartPulse 
            size={iconSubSize} 
            className={`${iconColor} absolute ${heartOffset} opacity-60 z-0 transition-all duration-300 group-hover:opacity-80 group-hover:scale-105`} 
            strokeWidth={1.5}
        />
      </div>
      <span className={`font-bold ${textColor} ${textSize} font-heading leading-tight tracking-tight`}>
        MediCare AI
      </span>
    </div>
  );
};

export default Logo;

