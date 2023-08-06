import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Tabs.module.scss";

export type TabProps = PropsWithChildren<{
  /**
   * The label of the tab.
   */
  label: string;
  /**
   * The id of the tab.
   */
  id: string;
  /**
   * Whether the tab is closeable.
   */
  closeable?: boolean;
  /**
   * The callback to call when the tab is closed.
   */
  onClose?: () => void;
  /**
   * Whether the tab is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the tab is close disabled.
   */
  closeDisabled?: boolean;
  /**
   * Whether the tab is contained.
   */
  contained?: boolean;
}> &
  BaseProps;

export function Tab({
  children,
  id,
  label,
  contained,
  className,
  dataTestId,
  style,
}: TabProps) {
  return (
    <div
      role="tabpanel"
      id={id}
      aria-labelledby={label}
      className={clsx(
        styles.tab,
        {
          [styles["tab--contained"]]: contained,
        },
        className,
      )}
      data-test-id={dataTestId}
      style={style}
    >
      {children}
    </div>
  );
}
