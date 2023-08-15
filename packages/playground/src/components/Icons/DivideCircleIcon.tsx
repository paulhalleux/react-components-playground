import { IconProps } from "./types";

export function DivideCircleIcon({
  size = 20,
  color = "currentColor",
}: IconProps) {
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
      <line x1="8" y1="12" x2="16" y2="12"></line>
      <line x1="12" y1="16" x2="12" y2="16"></line>
      <line x1="12" y1="8" x2="12" y2="8"></line>
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  );
}
