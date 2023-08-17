import { IconProps } from "./types";

export function PillIcon({
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
    </svg>
  );
}
