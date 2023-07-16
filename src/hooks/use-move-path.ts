import { Keyframe, KeyframeChangeFn } from "../types";
import React from "react";

export function useMovePath(
  parentRef: React.RefObject<HTMLElement>,
  onKeyframeChange: KeyframeChangeFn,
  keyframes: Keyframe[],
) {
  const onPathMove = (
    startKeyframe: number,
    endKeyframe: number,
    movementX: number,
    movementY: number,
  ) => {
    const parentPosition = parentRef.current?.getBoundingClientRect();
    if (!parentPosition) {
      return;
    }

    const newStartX = keyframes[startKeyframe].position.x + movementX;
    const newStartY = keyframes[startKeyframe].position.y + movementY;

    const newEndX = keyframes[endKeyframe].position.x + movementX;
    const newEndY = keyframes[endKeyframe].position.y + movementY;

    if (
      newStartX < 0 ||
      newStartX > parentPosition.width ||
      newStartY < 0 ||
      newStartY > parentPosition.height
    ) {
      return;
    }

    if (
      newEndX < 0 ||
      newEndX > parentPosition.width ||
      newEndY < 0 ||
      newEndY > parentPosition.height
    ) {
      return;
    }

    onKeyframeChange(startKeyframe, {
      position: {
        x: newStartX,
        y: newStartY,
      },
    });

    onKeyframeChange(endKeyframe, {
      position: {
        x: newEndX,
        y: newEndY,
      },
    });
  };

  return { onPathMove };
}
