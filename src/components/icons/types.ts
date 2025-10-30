export interface IconProps {
  className?: string;
  onClick?: () => void;
  size?: number;
  color?: string;
}

export interface SVGIconProps extends IconProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}