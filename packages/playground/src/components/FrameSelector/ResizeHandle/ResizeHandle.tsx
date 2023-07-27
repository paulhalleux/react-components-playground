import React from "react";

import { useEventListener } from "../../../hooks/use-event-listener";
import { FrameResizeFn, HandlePosition, HandleType } from "../types";

import styles from "./ResizeHandle.module.scss";

export type ResizeHandleProps = {
  parentRef: React.RefObject<HTMLElement>;
  type: HandleType;
  position: HandlePosition;
  onResize: FrameResizeFn;
};

export function ResizeHandle({
  parentRef,
  onResize,
  type,
  position,
}: ResizeHandleProps) {
  const [resizing, setResizing] = React.useState(false);

  const onMouseDown = () => {
    setResizing(true);
  };

  const onMouseUp = () => {
    setResizing(false);
  };

  useEventListener("mousemove", (e: MouseEvent) => {
    if (!resizing) {
      return;
    }

    const parentPosition = parentRef.current?.getBoundingClientRect();
    if (!parentPosition) {
      return;
    }

    const cursorPosition = {
      x: e.clientX - parentPosition.left,
      y: e.clientY - parentPosition.top,
    };

    onResize(position, cursorPosition);
  });

  useEventListener("mouseup", () => {
    setResizing(false);
  });

  return (
    <div
      className={styles[`resize-handle-${type}`]}
      data-handle-postion={position}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
}
