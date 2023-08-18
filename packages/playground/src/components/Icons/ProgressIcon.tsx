import { IconProps } from "./types";

export function ProgressIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      className={className}
    >
      <rect
        x="3"
        y="8"
        width="18"
        height="8"
        rx="4"
        stroke={color}
        stroke-width="2"
      />
      <path
        d="M7 12H10"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
