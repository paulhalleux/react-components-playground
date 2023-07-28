import { IconProps } from "./types";

export function PlusIcon({ height = 20, width = 20 }: IconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 16 16" width={width} height={height}>
      <path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
    </svg>
  );
}
