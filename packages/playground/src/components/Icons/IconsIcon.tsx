import { IconProps } from "./types";

export function IconsIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M10 6.5 A3.5 3.5 0 0 1 6.5 10 A3.5 3.5 0 0 1 3 6.5 A3.5 3.5 0 0 1 10 6.5 z" />
      <path d="M2.5 21h8l-4-7zM14 3l7 7M14 10l7-7M14 14h7v7h-7z" />
    </svg>
  );
}
