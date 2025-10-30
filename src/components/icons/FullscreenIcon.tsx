import React from 'react';
import { IconProps } from './types';

interface FullscreenIconProps extends IconProps {
  isFullscreen?: boolean;
}

export const FullscreenIcon: React.FC<FullscreenIconProps> = ({ 
  className, 
  onClick, 
  size = 20,
  color = "currentColor",
  isFullscreen = false
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {isFullscreen ? (
        // Minimize icon (arrows pointing inward)
        <path
          d="M8 3v3a2 2 0 01-2 2H3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M16 21v-3a2 2 0 012-2h3"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        // Fullscreen icon (arrows pointing outward)
        <path
          d="M7 14H5v5h5v-2M5 10V5h5v2M17 14h2v5h-5v-2M19 10V5h-5v2"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};