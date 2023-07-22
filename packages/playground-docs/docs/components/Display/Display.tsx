import React, { ForwardedRef, forwardRef, PropsWithChildren } from "react";

import styles from "./Display.module.scss";

type DisplayProps = PropsWithChildren;

function Display(
  { children }: DisplayProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div onWheel={onWheel} className={styles.display} ref={ref}>
      {children}
    </div>
  );
}

export default forwardRef(Display);
