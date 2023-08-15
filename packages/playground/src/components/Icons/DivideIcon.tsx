import { IconProps } from "./types";

export function DivideIcon({ size = 20, color = "currentColor" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      height={size}
      width={size}
    >
      <circle cx="12" cy="6" r="2"></circle>
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <circle cx="12" cy="18" r="2"></circle>
    </svg>
  );
}
