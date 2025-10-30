import React from 'react';
import { IconProps } from './types';

export const CollapseIcon: React.FC<IconProps> = ({ 
  className, 
  onClick, 
  size = 20,
  color = "currentColor" 
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
      <path
        d="M18 12l-3 3-3-3m-6 3l-3 3-3-3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};