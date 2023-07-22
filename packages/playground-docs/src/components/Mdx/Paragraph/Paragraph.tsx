import { PropsWithChildren } from "react";

import styles from "./Paragraph.module.scss";

type ParagraphProps = PropsWithChildren;

export function Paragraph({ children }: ParagraphProps) {
  return <p className={styles.paragraph}>{children}</p>;
}
