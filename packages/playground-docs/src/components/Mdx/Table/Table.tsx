import { PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Table.module.scss";

type TableProps = PropsWithChildren<{
  className?: string;
}>;

export function Table({ children, className }: TableProps) {
  return (
    <div className={styles.table__container}>
      <table className={clsx(styles.table, className)}>{children}</table>
    </div>
  );
}
