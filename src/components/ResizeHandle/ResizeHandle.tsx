import { HandlePosition, HandleType, ResizeFn } from "../../types";

import styles from "./ResizeHandle.module.scss";
import React from "react";
import { useEventListener } from "../../hooks/use-event-listener";

type ResizeHandleProps = {
  parentRef: React.RefObject<HTMLElement>;
  type: HandleType;
  position: HandlePosition;
  onResize: ResizeFn;
};

export function ResizeHandle({
  parentRef,
  onResize,
  type,
  position,
}: ResizeHandleProps) {
  const [resizing, setResizing] = React.useState(false);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setResizing(true);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

  useEventListener("mouseup", (e: MouseEvent) => {
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
