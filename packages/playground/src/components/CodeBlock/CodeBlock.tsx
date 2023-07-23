import { PropsWithChildren, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import hljs from "highlight.js";

import { Button } from "../Button";

import "./theme.scss";
import styles from "./CodeBlock.module.scss";

type CodeProps = PropsWithChildren<{
  className?: string;
  defaultExpanded?: boolean;
  language?: string;
  collapseAt?: number;
}>;

export function CodeBlock({
  children,
  className,
  defaultExpanded = true,
  language,
  collapseAt = 300,
}: CodeProps) {
  const blockRef = useRef<HTMLPreElement>(null);
  const [expanded, setExpanded] = useState(defaultExpanded);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  useEffect(() => {
    if (blockRef.current && blockRef.current.offsetHeight > collapseAt) {
      setExpanded(false);
    }
  }, [blockRef]);

  return (
    <pre
      className={clsx(styles.code__wrapper, {
        [`language-${language}`]: !!language,
      })}
      ref={blockRef}
    >
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
    </pre>
  );
}
