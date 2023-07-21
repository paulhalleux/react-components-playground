import { IconProps } from "./types";

export function CleanIcon({ height = 24, width = 24 }: IconProps) {
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
      <path d="M20.048 16.033A9 9 0 007.954 3.958M5.633 5.64a9 9 0 0012.733 12.723M3 3l18 18" />
    </svg>
  );
}
