'use client';

import { Aperture } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
};

const textSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
};

export default function Logo({ size = 'md', showText = true, onClick }: LogoProps) {
  const logoClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div className={`flex items-center gap-2 ${logoClasses}`} onClick={onClick}>
      <div className={`${sizeClasses[size]} bg-gradient-to-tr from-rose-500 to-orange-400 rounded-lg flex items-center justify-center text-white`}>
        <Aperture size={iconSizes[size]} strokeWidth={1.5} />
      </div>
      {showText && (
        <span className={`${textSizes[size]} font-semibold tracking-tight text-slate-900`}>
          AUTOPIN
        </span>
      )}
    </div>
  );
}