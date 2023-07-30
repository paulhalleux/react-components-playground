import { PropsWithChildren } from "react";

import styles from "./Title.module.scss";

type TitleProps = PropsWithChildren;

export function Title({ children }: TitleProps) {
  return <div className={styles.title}>{children}</div>;
}
