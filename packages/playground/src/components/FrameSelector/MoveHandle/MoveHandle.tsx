import React, { PropsWithChildren, useState } from "react";

import { useEventListener } from "../../../hooks/use-event-listener";
import { Point } from "../../../types";
import { FrameMoveFn } from "../../../types/frame-selection";

import styles from "./MoveHandle.module.scss";

export type MoveHandleProps = PropsWithChildren<{
  parentRef: React.RefObject<HTMLElement>;
  onMove: FrameMoveFn;
}>;

export function MoveHandle({ parentRef, onMove, children }: MoveHandleProps) {
  const [dragPosition, setDragPosition] = useState<Point>({ x: 0, y: 0 });
  const [moving, setMoving] = useState(false);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setMoving(true);
    setDragPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const onMouseUp = () => {
    setMoving(false);
  };

  useEventListener("mouseup", onMouseUp);
  useEventListener("mousemove", (e: MouseEvent) => {
    if (!moving) {
      return;
    }

    const parentPosition = parentRef.current?.getBoundingClientRect();
    if (!parentPosition) {
      return;
    }

    const cursorPosition = {
      x: e.clientX,
      y: e.clientY,
    };

    onMove(cursorPosition, dragPosition);
  });

  return (
    <div className={styles["move-handle"]}>
      <div
        className={styles["move-handle-drag"]}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
      {children}
    </div>
  );
}
