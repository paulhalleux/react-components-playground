import { Point, Size } from "../types";
import React from "react";
import { FrameMoveFn } from "../types/frame-selection";

export function useFramePosition(
  parentRef: React.RefObject<HTMLElement>,
  size: Size,
  position: Point,
  onPositionChange: (position: Point) => void,
) {
  const onMove: FrameMoveFn = (cursorPosition, offset) => {
    const parentPosition = parentRef.current?.getBoundingClientRect();
    if (!parentPosition) {
      return;
    }

    const cursorDelta = {
      x: Number((cursorPosition.x - parentPosition.x - offset.x).toFixed(0)),
      y: Number((cursorPosition.y - parentPosition.y - offset.y).toFixed(0)),
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
