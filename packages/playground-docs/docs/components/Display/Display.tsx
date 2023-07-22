import React, { ForwardedRef, forwardRef, PropsWithChildren } from "react";

import { Button } from "../../../src/components";

import styles from "./Display.module.scss";

type DisplayProps = PropsWithChildren<{
  onReset?: () => void;
  padding?: number;
  align?: "flex-start" | "center" | "flex-end";
  direction?: "row" | "column";
}>;

function Display(
  { children, onReset, padding, align, direction }: DisplayProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      onWheel={onWheel}
      className={styles.display}
      ref={ref}
      style={{
        padding,
        alignItems: align,
        justifyContent: align,
        flexDirection: direction,
        gap: padding,
      }}
    >
      {onReset && (
        <Button className={styles.reset} onClick={onReset} size="small">
          Reset
        </Button>
      )}
      {children}
    </div>
  );
}

export default forwardRef(Display);
