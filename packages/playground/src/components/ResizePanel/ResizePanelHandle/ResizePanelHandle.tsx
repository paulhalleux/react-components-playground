import React from "react";
import clsx from "clsx";

import { useEventListener } from "../../../hooks";
import { useResizePanel } from "../resize-panel-context";
import { ResizePanelGroupDirection } from "../ResizePanelGroup";

import styles from "./ResizePanelHandle.module.scss";

export type ResizePanelHandleProps = {
  direction?: ResizePanelGroupDirection;
  leftPanelId: string;
  rightPanelId: string;
};

export function ResizePanelHandle({
  direction,
  rightPanelId,
  leftPanelId,
}: ResizePanelHandleProps) {
  const { setSize } = useResizePanel();
  const [moving, setMoving] = React.useState(false);

  const onMouseDown = React.useCallback(() => {
    setMoving(true);
  }, []);

  useEventListener("mouseup", () => {
    setMoving(false);
  });

  useEventListener("mousemove", (event: MouseEvent) => {
    if (!moving) return;
    setSize(
      leftPanelId,
      (prev) =>
        prev + (direction === "horizontal" ? event.movementX : event.movementY),
    );
    setSize(
      rightPanelId,
      (prev) =>
        prev - (direction === "horizontal" ? event.movementX : event.movementY),
    );
  });

  return (
    <div
      onMouseDown={onMouseDown}
      className={clsx(
        styles["resize-panel__handle"],
        styles[`resize-panel__handle--${direction}`],
      )}
    >
      <div className={styles["resize-panel__handle__interaction"]} />
    </div>
  );
}
