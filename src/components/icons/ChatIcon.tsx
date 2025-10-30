import React from 'react';
import { IconProps } from './types';

export const ChatIcon: React.FC<IconProps> = ({ 
  className, 
  onClick, 
  size = 24,
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
        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
        fill={color}
      />
      <circle cx="7" cy="10" r="1" fill={color} />
      <circle cx="12" cy="10" r="1" fill={color} />
      <circle cx="17" cy="10" r="1" fill={color} />
    </svg>
  );
};