import { IconProps } from "./types";

export function TabsIcon({ size = 20, color = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
    >
      <path
        d="M5 9C3.89543 9 3 9.67157 3 10.5V13.5C3 14.3284 3.89543 15 5 15M5 9V15M5 9H6.125M5 15H6.125M8 9V15M8 9H14.5M8 9H7.25M8 15H14.5M8 15H7.25M14.5 9V15M14.5 9H16H19C20.1046 9 21 9.67157 21 10.5V13.5C21 14.3284 20.1046 15 19 15H14.5M7.25 9V15M7.25 9H6.125M7.25 15H6.125M6.125 9V15"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
