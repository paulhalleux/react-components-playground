import { IconProps } from "./types";

export function MoonIcon({ width = 20, height = 20 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height={height} width={width}>
      <path d="M20.742 13.045a8.088 8.088 0 01-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 01-2.064-7.723A1 1 0 009.73 2.034a10.014 10.014 0 00-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 007.072 2.93 9.93 9.93 0 007.07-2.929 10.007 10.007 0 002.583-4.491 1.001 1.001 0 00-1.224-1.224zm-2.772 4.301a7.947 7.947 0 01-5.656 2.343 7.953 7.953 0 01-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 012.06-1.483 10.027 10.027 0 002.89 7.848 9.972 9.972 0 007.848 2.891 8.036 8.036 0 01-1.484 2.059z" />
    </svg>
  );
}
