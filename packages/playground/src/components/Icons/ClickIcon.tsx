import { IconProps } from "./types";

export function ClickIcon({ height = 20, width = 20 }: IconProps) {
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
      <path d="M3 12h3M12 3v3M7.8 7.8L5.6 5.6M16.2 7.8l2.2-2.2M7.8 16.2l-2.2 2.2M12 12l9 3-4 2-2 4-3-9" />
    </svg>
  );
}
