import { PropsWithChildren } from "react";

import { useWindowSize } from "../../hooks";

export type WindowSizeProps = PropsWithChildren<
  | {
      /**
       * The maximum width of the window for the children to be rendered.
       */
      maxWidth?: number;
      /**
       * The minimum width of the window for the children to be rendered.
       */
      minWidth?: never;
    }
  | {
      /**
       * The maximum width of the window for the children to be rendered.
       */
      minWidth?: number;
      /**
       * The minimum width of the window for the children to be rendered.
       */
      maxWidth?: never;
    }
> & {
  /**
   * The window element to use for the window size.
   */
  windowElement?: Window;
};

export function WindowSize({
  maxWidth,
  minWidth,
  children,
  windowElement = window,
}: WindowSizeProps) {
  const { width } = useWindowSize(windowElement);

  if (maxWidth && width > maxWidth) {
    return null;
  }

  if (minWidth && width < minWidth) {
    return null;
  }

  return <>{children}</>;
}
