import { IconProps } from "./types";

export function ArrowTightRightIcon({
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
        d="M5 12L19 12"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 8L19 12L15 16"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
