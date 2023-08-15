import { IconProps } from "./types";

export function ArrowUpLeftIcon({
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
      <line x1="17" y1="17" x2="7" y2="7"></line>
      <polyline points="7 17 7 7 17 7"></polyline>
    </svg>
  );
}
