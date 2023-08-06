import { IconProps } from "./types";

export function LabelIcon({ height = 20, width = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height={height} width={width}>
      <path d="M16 17H5V7h11l3.55 5m-1.92-6.16C17.27 5.33 16.67 5 16 5H5a2 2 0 00-2 2v10a2 2 0 002 2h11c.67 0 1.27-.34 1.63-.85L22 12l-4.37-6.16z" />
    </svg>
  );
}