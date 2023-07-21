import { PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Code.module.scss";

type CodeProps = PropsWithChildren<{
  isBlock?: boolean;
  className?: string;
}>;

export function Code({ isBlock, children, className }: CodeProps) {
  if (!isBlock) {
    return <code className={clsx(styles.code, className)}>{children}</code>;
  }

  return (
    <code className={clsx(styles.code__block, className)}>{children}</code>
  );
}
