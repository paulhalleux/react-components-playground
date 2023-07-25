import { IconProps } from "./types";

export function SelectionFrameIcon({ height = 20, width = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height={height} width={width}>
      <path d="M2 4a2 2 0 012-2h3v2H4v3H2V4m20 0v3h-2V4h-3V2h3a2 2 0 012 2m-2 16v-3h2v3a2 2 0 01-2 2h-3v-2h3M2 20v-3h2v3h3v2H4a2 2 0 01-2-2m8-18h4v2h-4V2m0 18h4v2h-4v-2m10-10h2v4h-2v-4M2 10h2v4H2v-4z" />
    </svg>
  );
}
