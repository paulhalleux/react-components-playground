import React from "react";

import { KeyframePathOptions } from "../../../constants/keyframe-path";
import { useEventListener } from "../../../hooks/use-event-listener";
import { PositionChangeFn } from "../../../types";
import { Keyframe } from "../types";

import styles from "./InterpolationHandle.module.scss";

export type InterpolationHandleProps = {
  point: "p1" | "p2";
  keyframe: Keyframe;
  onPositionChange: PositionChangeFn;
  size?: number;
};

export function InterpolationHandle({
  point,
  keyframe,
  onPositionChange,
  size = KeyframePathOptions.Interpolation.HandleSize,
}: InterpolationHandleProps) {
  const [moving, setMoving] = React.useState(false);

  const onMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setMoving(true);
  };
  const onMouseUp = () => setMoving(false);

  useEventListener("mouseup", onMouseUp);
  useEventListener("mousemove", (event: MouseEvent) => {
    if (!moving) {
      return;
    }

    onPositionChange(
      interpolationPoint.x + event.movementX,
      interpolationPoint.y + event.movementY,
    );
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
