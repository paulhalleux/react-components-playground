import { IconProps } from "./types";

export function NotificationIcon({ height = 20, width = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height={height} width={width}>
      <path d="M21 6 A3 3 0 0 1 18 9 A3 3 0 0 1 15 6 A3 3 0 0 1 21 6 z" />
      <path d="M18 19H5V6h8c0-.712.153-1.387.422-2H5c-1.103 0-2 .897-2 2v13c0 1.103.897 2 2 2h13c1.103 0 2-.897 2-2v-8.422A4.962 4.962 0 0118 11v8z" />
    </svg>
  );
}