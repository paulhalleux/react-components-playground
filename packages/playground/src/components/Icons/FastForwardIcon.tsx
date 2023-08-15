import { IconProps } from "./types";

export function FastForwardIcon({
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
      <polygon points="13 19 22 12 13 5 13 19"></polygon>
      <polygon points="2 19 11 12 2 5 2 19"></polygon>
    </svg>
  );
}
