import { useState, useEffect } from "react";

interface AnimatedPlaceholderProps {
  placeholderTexts: string[];
  shouldAnimate: boolean;
  className?: string;
}

export const AnimatedPlaceholder = ({
  placeholderTexts,
  shouldAnimate,
  className = "",
}: AnimatedPlaceholderProps) => {
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Auto-rotate placeholders with transition
  useEffect(() => {
    if (!shouldAnimate || placeholderTexts.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
        setAnimationKey(prev => prev + 1);
        setIsTransitioning(false);
      }, 150); // Half of transition duration
      
    }, 2000);

    return () => clearInterval(interval);
  }, [shouldAnimate, placeholderTexts.length]);

  // Reset to first placeholder when animation stops
  useEffect(() => {
    if (!shouldAnimate) {
      setCurrentPlaceholderIndex(0);
      setIsTransitioning(false);
      setAnimationKey(0);
    }
  }, [shouldAnimate]);

  return (
    <div
      className={`animated-placeholder-container ${className}`}
    >
      <span
        key={animationKey}
        className={`animated-placeholder-text ${isTransitioning ? 'transitioning' : ''}`}
      >
        {placeholderTexts[currentPlaceholderIndex]}
      </span>
    </div>
  );
};