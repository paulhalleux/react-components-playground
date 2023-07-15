import { Keyframe as KeyframeType, Point } from "../../types";
import styles from "./Keyframe.module.scss";
import React from "react";
import { useEventListener } from "../../hooks/use-event-listener";
import { minmax } from "../../utils/math";

export type KeyframeProps = {
  parentRef: React.RefObject<HTMLDivElement>;
  keyframe: KeyframeType;
  onPositionChange: (position: Point) => void;
};

export function Keyframe({
  parentRef,
  keyframe,
  onPositionChange,
}: KeyframeProps) {
  const [moving, setMoving] = React.useState(false);

  const onMouseDown = () => {
    setMoving(true);
  };

  const onMouseUp = () => {
    setMoving(false);
  };

  useEventListener("mousemove", (event) => {
    if (moving) {
      const parentRect = parentRef.current?.getBoundingClientRect();
      if (parentRect) {
        const x = minmax(event.clientX - parentRect.left, 0, parentRect.width);
        const y = minmax(event.clientY - parentRect.top, 0, parentRect.height);
        onPositionChange({ x, y });
      }
    }
  });

  useEventListener("mouseup", onMouseUp);

  return (
    <rect
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      x={keyframe.position.x - 3.5}
      y={keyframe.position.y - 3.5}
      width={7}
      height={7}
      className={styles["keyframe"]}
    />
  );
}
