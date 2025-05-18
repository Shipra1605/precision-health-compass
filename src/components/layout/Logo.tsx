
import React from 'react';
import { Stethoscope, Brain } from 'lucide-react';

interface LogoProps {
  size?: 'md' | 'lg' | 'xl';
  textColor?: string;
  wrapperClassName?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = "xl", 
  textColor = "text-gray-800",
  wrapperClassName = "" 
}) => {
  const iconSizeClass = size === 'xl' ? 'h-6 w-6' : (size === 'lg' ? 'h-5 w-5' : 'h-4 w-4');
  const brainIconSizeClass = size === 'xl' ? 'h-3 w-3' : (size === 'lg' ? 'h-2.5 w-2.5' : 'h-2 w-2');
  const brainPositionClass = size === 'xl' ? 'top-1 right-1' : (size === 'lg' ? 'top-0.5 right-0.5' : 'top-0.5 right-0.5');
  const containerSizeClass = size === 'xl' ? 'h-10 w-10' : (size === 'lg' ? 'h-8 w-8' : 'h-7 w-7');
  const textSizeClass = size === 'xl' ? 'text-xl' : (size === 'lg' ? 'text-lg' : 'text-base');
  const subTextSizeClass = size === 'xl' ? 'text-xs' : (size === 'lg' ? 'text-xs' : 'text-[10px]');

  return (
    <div className={`flex items-center gap-2 ${wrapperClassName}`}>
      <div className={`relative flex items-center justify-center ${containerSizeClass} bg-gradient-to-br from-teal-500 to-blue-600 rounded-full shadow`}>
        <Stethoscope className={`text-white ${iconSizeClass}`} />
        <Brain className={`absolute text-white opacity-80 ${brainIconSizeClass} ${brainPositionClass}`} />
      </div>
      <div className="flex flex-col items-start">
        <span className={`font-bold ${textColor} ${textSizeClass} font-heading leading-tight`}>MediCare AI</span>
        {/* You can add a tagline here if desired in the future */}
        {/* <span className={`text-gray-500 ${subTextSizeClass}`}>Your Health Companion</span> */}
      </div>
    </div>
  );
};

export default Logo;
