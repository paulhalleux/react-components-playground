import { PropsWithChildren } from "react";

import styles from "./UnorderedList.module.scss";

type UnorderedListProps = PropsWithChildren;

export function UnorderedList({ children }: UnorderedListProps) {
  return <ul className={styles.list}>{children}</ul>;
}
