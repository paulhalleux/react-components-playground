import { MoveFn, Point, Size } from "../types";
import React from "react";

export function useFramePosition(
  parentRef: React.RefObject<HTMLElement>,
  size: Size,
  position: Point,
  onPositionChange: (position: Point) => void,
) {
  const onMove: MoveFn = (cursorPosition, offset) => {
    // cursor position is relative to the window
    // map it to the parent element
    const parentPosition = parentRef.current?.getBoundingClientRect();
    if (!parentPosition) {
      return;
    }

    const cursorDelta = {
      x: cursorPosition.x - parentPosition.x - offset.x,
      y: cursorPosition.y - parentPosition.y - offset.y,
    };

    if (cursorDelta.x < 0) {
      cursorDelta.x = 0;
    }

    if (cursorDelta.y < 0) {
      cursorDelta.y = 0;
    }

    if (cursorDelta.x > parentPosition.width - size.width) {
      cursorDelta.x = parentPosition.width - size.width;
    }

    if (cursorDelta.y > parentPosition.height - size.height) {
      cursorDelta.y = parentPosition.height - size.height;
    }

    onPositionChange(cursorDelta);
  };

  return { onMove };
}
