import { JSX, PropsWithChildren } from "react";
import kebab from "lodash/kebabCase";

import styles from "./Title.module.scss";

type TitleProps = PropsWithChildren<{
  level: number;
}>;

export function Title({ level, children }: TitleProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag
      id={kebab(children?.toString())}
      className={styles[`heading__h${level}`]}
    >
      {children}
    </Tag>
  );
}
