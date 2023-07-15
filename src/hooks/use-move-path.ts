import { Keyframe, KeyframeMoveFn } from "../types";
import React from "react";

export function useMovePath(
  parentRef: React.RefObject<HTMLElement>,
  onKeyframeMove: KeyframeMoveFn,
  keyframes: Keyframe[],
) {
  const onPathMove = (
    startKeyframe: number,
    endKeyframe: number,
    offsetX: number,
    offsetY: number,
  ) => {
    const parentPosition = parentRef.current?.getBoundingClientRect();
    if (!parentPosition) {
      return;
    }

    const newStartX = keyframes[startKeyframe].position.x - offsetX;
    const newStartY = keyframes[startKeyframe].position.y - offsetY;

    const newEndX = keyframes[endKeyframe].position.x - offsetX;
    const newEndY = keyframes[endKeyframe].position.y - offsetY;

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

    onKeyframeMove(startKeyframe, {
      x: newStartX,
      y: newStartY,
    });

    onKeyframeMove(endKeyframe, {
      x: newEndX,
      y: newEndY,
    });
  };

  return { onPathMove };
}
