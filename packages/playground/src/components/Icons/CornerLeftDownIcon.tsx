import { IconProps } from "./types";

export function CornerLeftDownIcon({
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
      <polyline points="14 15 9 20 4 15"></polyline>
      <path d="M20 4h-7a4 4 0 0 0-4 4v12"></path>
    </svg>
  );
}
