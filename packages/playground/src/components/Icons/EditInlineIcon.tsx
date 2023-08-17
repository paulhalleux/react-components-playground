import { IconProps } from "./types";

export function EditInlineIcon({
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
        d="M10.8462 7H19.1538C20.1734 7 21 8.11929 21 9.5V14.5C21 15.8807 20.1734 17 19.1538 17H10.8462M5.30769 7V17H7.61538H3M5.30769 7H7.61538M5.30769 7H3"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
