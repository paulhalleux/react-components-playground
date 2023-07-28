import { PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Tabs.module.scss";

export type TabProps = PropsWithChildren<{
  label: string;
  id: string;
  closeable?: boolean;
  onClose?: () => void;
  disabled?: boolean;
  closeDisabled?: boolean;
  contained?: boolean;
}>;

export function Tab({ children, id, label, contained }: TabProps) {
  return (
    <div
      role="tabpanel"
      id={id}
      aria-labelledby={label}
      className={clsx(styles.tab, {
        [styles["tab--contained"]]: contained,
      })}
    >
      {children}
    </div>
  );
}
