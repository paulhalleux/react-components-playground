import { IconProps } from "./types";

export function RectangleIcon({
  size = 20,
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
    >
      <path
        d="M19 7H5C3.89543 7 3 8.11929 3 9.5V14.5C3 15.8807 3.89543 17 5 17H19C20.1046 17 21 15.8807 21 14.5V9.5C21 8.11929 20.1046 7 19 7Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}