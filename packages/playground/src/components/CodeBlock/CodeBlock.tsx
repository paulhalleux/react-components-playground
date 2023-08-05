import {
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import Prism from "prismjs";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";

import { BaseProps } from "../../types";
import { Button } from "../Button";

import "./theme.scss";
import styles from "./CodeBlock.module.scss";

export type CodeBlockProps = PropsWithChildren<{
  /**
   * Whether the code block should be expanded by default.
   */
  defaultExpanded?: boolean;
  /**
   * The language of the code block.
   */
  language?: string;
  /**
   * The height at which the code block should collapse.
   */
  collapseAt?: number;
  /**
   * The maximum height of the code block.
   */
  maxHeight?: number;
  /**
   * The lines to highlight.
   */
  highlightedLines?: string;
}> &
  BaseProps;

export function CodeBlock({
  children,
  className,
  defaultExpanded,
  language,
  collapseAt = 300,
  highlightedLines,
  maxHeight,
}: CodeBlockProps) {
  const blockRef = useRef<HTMLPreElement>(null);
  const baseCodeRef = useRef<HTMLDivElement>(null);

  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(defaultExpanded);

  useLayoutEffect(() => {
    Prism.highlightAll();
    const lines = baseCodeRef.current?.innerHTML.trim().split("\n");
    setCodeLines(lines || []);
  }, [children, highlightedLines]);

  useEffect(() => {
    if (
      expanded === undefined &&
      blockRef.current &&
      blockRef.current.offsetHeight > collapseAt
    ) {
      setExpanded(false);
    }
  }, [codeLines, expanded]);

  const parsedHighlightedLines = useMemo(() => {
    if (!highlightedLines) return [];
    return highlightedLines
      .split(",")
      .map((line) => {
        const range = line.split("-");
        if (range.length === 1) {
          return parseInt(range[0]);
        }

        return Array.from({
          length: parseInt(range[1]) - parseInt(range[0]) + 1,
        }).map((_, index) => parseInt(range[0]) + index);
      })
      .flat();
  }, [highlightedLines]);

  return (
    <pre
      className={clsx(styles.code__wrapper, {
        [styles.code__block_expanded]: expanded,
      })}
      ref={blockRef}
      style={{ maxHeight }}
    >
      <code
        className={clsx(styles.base__code, {
          [`language-${language}`]: !!language,
        })}
        ref={baseCodeRef}
      >
        {children}
      </code>
      <div className={clsx(styles.code__block, className)}>
        {codeLines.map((line, index) => (
          <div
            key={index}
            data-line-number={index + 1}
            className={clsx(styles.code__block__line, {
              [styles.code__block__line__highlighted]:
                parsedHighlightedLines.includes(index + 1),
            })}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </div>

      {!expanded && (
        <div className={styles.code__block__expand__wrapper}>
          <Button onClick={() => setExpanded(true)}>Expand</Button>
        </div>
      )}
    </pre>
  );
}
