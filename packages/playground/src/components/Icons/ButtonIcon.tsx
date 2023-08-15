import { IconProps } from "./types";

export function ButtonIcon({ size = 20, color = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
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
        d="M7 12H17"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
