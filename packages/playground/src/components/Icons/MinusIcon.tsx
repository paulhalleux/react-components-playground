import { IconProps } from "./types";

export function MinusIcon({ height = 20, width = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={width} height={height}>
      <path d="M17 11a1 1 0 010 2H7a1 1 0 010-2h10z" />
    </svg>
  );
}
