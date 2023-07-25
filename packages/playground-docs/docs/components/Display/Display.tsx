import React, { ForwardedRef, forwardRef, PropsWithChildren } from "react";
import { Button } from "@paulhalleux/react-playground";
import clsx from "clsx";

import styles from "./Display.module.scss";

type DisplayProps = PropsWithChildren<{
  onReset?: () => void;
  padding?: number;
  align?: "flex-start" | "center" | "flex-end";
  direction?: "row" | "column";
  grow?: boolean;
}>;

function Display(
  { children, onReset, padding, align, direction, grow }: DisplayProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      onWheel={onWheel}
      className={clsx(styles.display, {
        [styles["display--grow"]]: grow,
      })}
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
