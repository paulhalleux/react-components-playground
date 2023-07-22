import { PropsWithChildren, useEffect } from "react";
import clsx from "clsx";
import hljs from "highlight.js";

import "./theme.scss";
import styles from "./Code.module.scss";

type CodeProps = PropsWithChildren<{
  isBlock?: boolean;
  className?: string;
}>;

export function Code({ isBlock, children, className }: CodeProps) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  if (!isBlock) {
    return <code className={clsx(styles.code, className)}>{children}</code>;
  }

  return (
    <code className={clsx(styles.code__block, className)}>{children}</code>
  );
}
