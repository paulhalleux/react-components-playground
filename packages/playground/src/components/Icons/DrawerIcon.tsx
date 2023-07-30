import { IconProps } from "./types";

export function DrawerIcon({ height = 20, width = 20 }: IconProps) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height={height}
      width={width}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M6 4 H18 A2 2 0 0 1 20 6 V18 A2 2 0 0 1 18 20 H6 A2 2 0 0 1 4 18 V6 A2 2 0 0 1 6 4 z" />
      <path d="M9 4v16" />
    </svg>
  );
}
