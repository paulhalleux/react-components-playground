import { IconProps } from "./types";

export function PauseCircleIcon({
  size = 20,
  color = "currentColor",
  className,
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
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="10" y1="15" x2="10" y2="9"></line>
      <line x1="14" y1="15" x2="14" y2="9"></line>
    </svg>
  );
}
