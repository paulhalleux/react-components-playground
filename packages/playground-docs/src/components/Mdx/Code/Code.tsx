import { PropsWithChildren, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import hljs from "highlight.js";

import { Button } from "../../Button";

import "./theme.scss";
import styles from "./Code.module.scss";

type CodeProps = PropsWithChildren<{
  isBlock?: boolean;
  className?: string;
}>;

export function Code({ isBlock, children, className }: CodeProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  useEffect(() => {
    if (blockRef.current && blockRef.current.offsetHeight > 400) {
      setExpanded(false);
    }
  }, [blockRef]);

  if (!isBlock) {
    return <code className={clsx(styles.code, className)}>{children}</code>;
  }

  return (
    <div className={styles.code__wrapper} ref={blockRef}>
      <code
        className={clsx(
          styles.code__block,
          {
            [styles.code__block_expanded]: expanded,
          },
          className,
        )}
      >
        {children}
      </code>

      {!expanded && (
        <div className={styles.code__block__expand__wrapper}>
          <Button onClick={() => setExpanded(true)}>Expand</Button>
        </div>
      )}
    </div>
  );
}
