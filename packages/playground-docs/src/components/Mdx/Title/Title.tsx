import { PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Title.module.scss";

type TitleProps = PropsWithChildren<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}>;

export function Title({ children, level }: TitleProps) {
  return (
    <div className={clsx(styles.title, styles[`title--level-${level}`])}>
      {children}
    </div>
  );
}
