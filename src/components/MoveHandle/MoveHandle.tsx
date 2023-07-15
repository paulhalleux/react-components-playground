import styles from "./MoveHandle.module.scss";
import React, { PropsWithChildren, useState } from "react";
import { useEventListener } from "../../hooks/use-event-listener";
import { MoveFn, Point } from "../../types";

export type MoveHandleProps = PropsWithChildren<{
  parentRef: React.RefObject<HTMLElement>;
  onMove: MoveFn;
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

  useEventListener("mouseup", (e: MouseEvent) => {
    setMoving(false);
  });

  return (
    <div
      className={styles["move-handle"]}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </div>
  );
}
