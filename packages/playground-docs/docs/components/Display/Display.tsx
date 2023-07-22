import React, { ForwardedRef, forwardRef, PropsWithChildren } from "react";

import { Button } from "../../../src/components";

import styles from "./Display.module.scss";

type DisplayProps = PropsWithChildren<{
  onReset?: () => void;
}>;

function Display(
  { children, onReset }: DisplayProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div onWheel={onWheel} className={styles.display} ref={ref}>
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
