import React from "react";

interface PulsatingDotsProps {
  className?: string;
}

// SVG layer order (bottom to top):
//  1. ring-bg     — white fill for the O's center; visible between waves
//  2. ring-stroke — fill="none" so waves can paint over it; both ring and waves are purple
//                   so the border reads as continuous while waves expand through it
//  3. waves       — grow from center to r=85 (full ring edge), fade as they expand
export const PulsatingDots: React.FC<PulsatingDotsProps> = ({ className }) => (
  <svg
    className={`chat-wrapper__pulsating-dots${className ? ` ${className}` : ""}`}
    viewBox="0 0 170 170"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle className="chat-wrapper__pulsating-ring-bg" cx="85" cy="85" r="61" />
    <circle className="chat-wrapper__pulsating-ring" cx="85" cy="85" r="73" fill="none" strokeWidth="1" />
    <circle className="chat-wrapper__pulsating-wave chat-wrapper__pulsating-wave--1" cx="85" cy="85" r="85" />
    <circle className="chat-wrapper__pulsating-wave chat-wrapper__pulsating-wave--2" cx="85" cy="85" r="85" />
    <circle className="chat-wrapper__pulsating-wave chat-wrapper__pulsating-wave--3" cx="85" cy="85" r="85" />
    <circle className="chat-wrapper__pulsating-wave chat-wrapper__pulsating-wave--4" cx="85" cy="85" r="85" />
  </svg>
);
