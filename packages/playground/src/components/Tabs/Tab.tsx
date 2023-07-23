import { PropsWithChildren } from "react";

import styles from "./Tabs.module.scss";

export type TabProps = PropsWithChildren<{
  label: string;
  id: string;
}>;

export function Tab({ children, id, label }: TabProps) {
  return (
    <div role="tabpanel" id={id} aria-labelledby={label} className={styles.tab}>
      {children}
    </div>
  );
}
