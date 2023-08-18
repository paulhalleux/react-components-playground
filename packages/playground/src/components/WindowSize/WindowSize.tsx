import { PropsWithChildren } from "react";
import { useWindowSize } from "react-use";

export type WindowSizeProps = PropsWithChildren<
  | {
      maxWidth?: number;
      minWidth?: never;
    }
  | {
      minWidth?: number;
      maxWidth?: never;
    }
>;

export function WindowSize({ maxWidth, minWidth, children }: WindowSizeProps) {
  const { width } = useWindowSize();

  if (maxWidth && width > maxWidth) {
    return null;
  }

  if (minWidth && width < minWidth) {
    return null;
  }

  return <>{children}</>;
}
