import { IconProps } from "./types";

export function DividerIcon({ height = 20, width = 20 }: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 15 15" height={height} width={width}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2 7.5a.5.5 0 01.5-.5h10a.5.5 0 010 1h-10a.5.5 0 01-.5-.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
