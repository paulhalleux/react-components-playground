import { IconProps } from "./types";

export function DashIcon({ height = 20, width = 20 }: IconProps) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height={height}
      width={width}
    >
      <path d="M112 476h160v72H112zm320 0h160v72H432zm320 0h160v72H752z" />
    </svg>
  );
}
