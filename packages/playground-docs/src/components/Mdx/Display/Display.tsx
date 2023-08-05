import React, { ForwardedRef, forwardRef, PropsWithChildren } from "react";
import { Button } from "@paulhalleux/react-playground";
import clsx from "clsx";

import { ExampleMetadata } from "../Example";

import styles from "./Display.module.scss";

type DisplayProps = PropsWithChildren<{
  onReset?: () => void;
}> &
  ExampleMetadata["display"];

function Display(
  {
    children,
    onReset,
    padding,
    align,
    direction,
    grow,
    border,
    height,
  }: DisplayProps,
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
        padding: padding ? 24 : undefined,
        alignItems: align,
        justifyContent: align,
        flexDirection: direction,
        gap: padding ? 24 : undefined,
        border: border === false ? "none" : undefined,
        height,
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
