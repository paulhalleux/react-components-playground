import { IconProps } from "./types";

export function ArrowTightLeftIcon({
  size = 20,
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
    >
      <path
        d="M19 12L5 12"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 16L5 12L9 8"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
