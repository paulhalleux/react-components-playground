import { IconProps } from "./types";

export function BreadcrumbIcon({
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
        d="M3 13H8.29412"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M15.7059 13H21.0001"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M11.4706 14.5L12.5294 13L11.4706 11.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
