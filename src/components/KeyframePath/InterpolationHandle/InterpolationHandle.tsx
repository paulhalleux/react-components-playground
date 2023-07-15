import styles from "./InterpolationHandle.module.scss";
import React from "react";
import { Keyframe, Point } from "../../../types";
import { useEventListener } from "../../../hooks/use-event-listener";

export type InterpolationHandleProps = {
  point: "p1" | "p2";
  keyframe: Keyframe;
  onPositionChange: (position: Point) => void;
};

export function InterpolationHandle({
  point,
  keyframe,
  onPositionChange,
}: InterpolationHandleProps) {
  const [moving, setMoving] = React.useState(false);
  const [lastPosition, setLastPosition] = React.useState<Point>({
    x: 0,
    y: 0,
  });

  const onMouseDown = (event: React.MouseEvent) => {
    setMoving(true);
    setLastPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const onMouseUp = () => {
    setMoving(false);
  };

  useEventListener("mouseup", onMouseUp);

  useEventListener("mousemove", (event: MouseEvent) => {
    if (!moving) {
      return;
    }

    const cursorPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    onPositionChange({
      x: cursorPosition.x - lastPosition.x,
      y: cursorPosition.y - lastPosition.y,
    });

    setLastPosition(cursorPosition);
  });

  if (!keyframe.interpolation || keyframe.interpolation.type !== "bezier")
    return null;

  const interpolationPoint =
    point === "p1" ? keyframe.interpolation.p1 : keyframe.interpolation.p2;

  return (
    <g>
      <path
        d={`M ${keyframe.position.x} ${keyframe.position.y} L ${
          keyframe.position.x + interpolationPoint.x
        } ${keyframe.position.y + interpolationPoint.y}`}
        className={styles["interpolation-path"]}
        fill="transparent"
        strokeWidth={1}
      />
      <rect
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        x={keyframe.position.x + interpolationPoint.x - 2}
        y={keyframe.position.y + interpolationPoint.y - 2}
        width={4}
        height={4}
        className={styles["interpolation-handle"]}
      />
    </g>
  );
}
