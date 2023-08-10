import { IconProps } from "./types";

export function TooltipIcon({ height = 20, width = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height={height} width={width}>
      <path d="M4 2h16a2 2 0 012 2v12a2 2 0 01-2 2h-4l-4 4-4-4H4a2 2 0 01-2-2V4a2 2 0 012-2m0 2v12h4.83L12 19.17 15.17 16H20V4H4z" />
    </svg>
  );
}