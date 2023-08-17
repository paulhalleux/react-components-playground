import { IconProps } from "./types";

export function PopoverIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      className={className}
    >
      <path
        d="M19 6H5C3.89543 6 3 7.11929 3 8.5V13.5C3 14.8807 3.89543 16 5 16H8.5L12 19L15.5 16H19C20.1046 16 21 14.8807 21 13.5V8.5C21 7.11929 20.1046 6 19 6Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
