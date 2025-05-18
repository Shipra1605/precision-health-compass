
import React from 'react';
import { HeartPulse } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  textColor?: string;
  wrapperClassName?: string;
}

const Logo: React.FC<LogoProps> = ({
  size = "xl",
  textColor = "text-brand-navy dark:text-brand-pearl-gray-light",
  wrapperClassName = "",
}) => {
  let imageSizeClass = 'w-12 h-12'; // for xl base image
  let textSizeClass = 'text-xl';
  let textOffsetClass = 'mt-1';
  let heartPulseSize = 20; // For xl

  if (size === 'lg') {
    imageSizeClass = 'w-10 h-10';
    textSizeClass = 'text-lg';
    heartPulseSize = 18;
  } else if (size === 'md') {
    imageSizeClass = 'w-9 h-9';
    textSizeClass = 'text-base';
    heartPulseSize = 16;
  } else if (size === 'sm') {
    imageSizeClass = 'w-8 h-8';
    textSizeClass = 'text-sm';
    textOffsetClass = 'mt-0.5';
    heartPulseSize = 14;
  }

  return (
    <div className={`flex flex-col items-center group transition-transform duration-300 ease-out hover:scale-105 ${wrapperClassName}`}>
      <div className="relative">
        <img 
          src="/lovable-uploads/7a437815-892a-4d55-883c-ab46119f9297.png" 
          alt="MediCare AI Logo" 
          className={`${imageSizeClass} object-contain`}
        />
        <HeartPulse 
          size={heartPulseSize} 
          className="absolute text-white opacity-70 group-hover:opacity-100 transition-opacity" 
          style={{ top: '25%', left: '50%', transform: 'translate(-50%, -50%) scale(0.6)' }} // Adjusted for better placement within the heart image
          strokeWidth={2.5}
        />
      </div>
      <span className={`font-bold ${textColor} ${textSizeClass} ${textOffsetClass} font-heading leading-tight tracking-tight whitespace-nowrap`}>
        MediCare AI
      </span>
    </div>
  );
};

export default Logo;

