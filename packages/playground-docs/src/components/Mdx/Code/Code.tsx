import { PropsWithChildren } from "react";
import { CodeBlock } from "@paulhalleux/react-playground";
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
    <CodeBlock
      language={className?.replace("language-", "")}
      defaultExpanded={true}
    >
      {children}
    </CodeBlock>
  );
}
