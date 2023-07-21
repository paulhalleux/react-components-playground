import { JSX, PropsWithChildren } from "react";

import styles from "./Title.module.scss";

type TitleProps = PropsWithChildren<{
  level: number;
}>;

export function Title({ level, children }: TitleProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={styles[`h${level}`]}>{children}</Tag>;
}
