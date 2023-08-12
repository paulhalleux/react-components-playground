import { IconProps } from "./types";

export function ChevronDownIcon({ height = 20, width = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height={height} width={width}>
      <path d="M16.293 9.293L12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z" />
    </svg>
  );
}
