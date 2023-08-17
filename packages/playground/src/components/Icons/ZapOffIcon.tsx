import { IconProps } from "./types";

export function ZapOffIcon({
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
      <polyline points="12.41 6.75 13 2 10.57 4.92"></polyline>
      <polyline points="18.57 12.91 21 10 15.66 10"></polyline>
      <polyline points="8 8 3 14 12 14 11 22 16 16"></polyline>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );
}
