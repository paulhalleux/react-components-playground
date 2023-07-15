import { FrameResizeFn, HandlePosition, Point, Size } from "../types";
import { minmax } from "../utils/math";
import React from "react";

export function useFrameSize(
  parentRef: React.RefObject<HTMLElement>,
  size: Size,
  minSize: Size,
  maxSize: Size,
  position: Point,
  onSizeChange: (size: Size) => void,
  onPositionChange: (position: Point) => void,
) {
  const parentWidth = parentRef.current?.getBoundingClientRect().width;
  const parentHeight = parentRef.current?.getBoundingClientRect().height;

  const onResize: FrameResizeFn = (handlePosition, cursorPosition) => {
    if (!parentWidth || !parentHeight) return;

    const cursorX = minmax(cursorPosition.x, 0, parentWidth);
    const cursorY = minmax(cursorPosition.y, 0, parentHeight);

    if (handlePosition === HandlePosition.Right) {
      const width = minmax(cursorX - position.x, minSize.width, maxSize.width);

      onSizeChange({
        height: size.height,
        width,
      });
    }

    if (handlePosition === HandlePosition.Bottom) {
      const height = minmax(
        cursorY - position.y,
        minSize.height,
        maxSize.height,
      );

      onSizeChange({
        height,
        width: size.width,
      });
    }

    if (handlePosition === HandlePosition.Top) {
      const height = minmax(
        position.y + size.height - cursorY,
        minSize.height,
        maxSize.height,
      );

      const heightDiff = height - size.height;

      onSizeChange({
        height,
        width: size.width,
      });

      onPositionChange({
        x: position.x,
        y: position.y - heightDiff,
      });
    }

    if (handlePosition === HandlePosition.Left) {
      const width = minmax(
        position.x + size.width - cursorX,
        minSize.width,
        maxSize.width,
      );

      const widthDiff = size.width - width;

      onSizeChange({
        height: size.height,
        width,
      });

      onPositionChange({
        x: position.x + widthDiff,
        y: position.y,
      });
    }

    if (handlePosition === HandlePosition.BottomRight) {
      const width = minmax(cursorX - position.x, minSize.width, maxSize.width);
      const height = minmax(
        cursorY - position.y,
        minSize.height,
        maxSize.height,
      );

      onSizeChange({
        height,
        width,
      });
    }

    if (handlePosition === HandlePosition.BottomLeft) {
      const width = minmax(
        position.x + size.width - cursorX,
        minSize.width,
        maxSize.width,
      );
      const height = minmax(
        cursorY - position.y,
        minSize.height,
        maxSize.height,
      );

      const widthDiff = size.width - width;

      onSizeChange({
        height,
        width,
      });

      onPositionChange({
        x: position.x + widthDiff,
        y: position.y,
      });
    }

    if (handlePosition === HandlePosition.TopRight) {
      const width = minmax(cursorX - position.x, minSize.width, maxSize.width);
      const height = minmax(
        position.y + size.height - cursorY,
        minSize.height,
        maxSize.height,
      );

      const heightDiff = size.height - height;

      onSizeChange({
        height,
        width,
      });

      onPositionChange({
        x: position.x,
        y: position.y + heightDiff,
      });
    }

    if (handlePosition === HandlePosition.TopLeft) {
      const width = minmax(
        position.x + size.width - cursorX,
        minSize.width,
        maxSize.width,
      );
      const height = minmax(
        position.y + size.height - cursorY,
        minSize.height,
        maxSize.height,
      );

      const widthDiff = size.width - width;
      const heightDiff = size.height - height;

      onSizeChange({
        height,
        width,
      });

      onPositionChange({
        x: position.x + widthDiff,
        y: position.y + heightDiff,
      });
    }
  };

  return { onResize };
}
