import { IconProps } from "./types";

export function CornerRightUpIcon({
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
      <polyline points="10 9 15 4 20 9"></polyline>
      <path d="M4 20h7a4 4 0 0 0 4-4V4"></path>
    </svg>
  );
}
