import styles from "./InterpolationHandle.module.scss";
import React from "react";
import { Keyframe, Point } from "../../../types";
import { useEventListener } from "../../../hooks/use-event-listener";
import { KeyframePathOptions } from "../../../constants/keyframe-path";

export type InterpolationHandleProps = {
  point: "p1" | "p2";
  keyframe: Keyframe;
  onPositionChange: (position: Point) => void;
  size?: number;
};

export function InterpolationHandle({
  point,
  keyframe,
  onPositionChange,
  size = KeyframePathOptions.Interpolation.HandleSize,
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
    <g id={`kf-${keyframe.time}-interpolation-${point}`}>
      <path
        d={`M ${keyframe.position.x} ${keyframe.position.y} L ${
          keyframe.position.x + interpolationPoint.x
        } ${keyframe.position.y + interpolationPoint.y}`}
        className={styles["interpolation-path"]}
        fill="transparent"
        strokeWidth={KeyframePathOptions.Interpolation.StrokeWidth}
      />
      <rect
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        x={keyframe.position.x + interpolationPoint.x - size / 2}
        y={keyframe.position.y + interpolationPoint.y - size / 2}
        width={size}
        height={size}
        className={styles["interpolation-handle"]}
      />
    </g>
  );
}
