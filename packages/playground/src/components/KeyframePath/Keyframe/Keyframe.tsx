import React from "react";
import clsx from "clsx";

import { KeyframePathOptions } from "../../../constants/keyframe-path";
import { useEventListener } from "../../../hooks/use-event-listener";
import { PositionChangeFn } from "../../../types";
import {
  Interpolation,
  Keyframe as KeyframeType,
} from "../../../types/keyframes";
import { Selectable } from "../../../types/selector";
import { minmax } from "../../../utils/math";
import { selectable } from "../../Selector/selectable";
import { InterpolationHandle } from "../InterpolationHandle";

import styles from "./Keyframe.module.scss";

export type KeyframeProps = Selectable & {
  parentRef: React.RefObject<HTMLDivElement>;
  isFirst: boolean;
  isLast: boolean;
  keyframe: KeyframeType;
  onPositionChange: PositionChangeFn;
  onInterpolationChange: (interpolation: Interpolation) => void;
  size?: number;
  enableBezier?: boolean;
};

function Keyframe({
  parentRef,
  isFirst,
  isLast,
  keyframe,
  onPositionChange,
  onInterpolationChange,
  selected,
  onSelect,
  size = KeyframePathOptions.Keyframe.Size,
  enableBezier,
}: KeyframeProps) {
  const [moving, setMoving] = React.useState(false);

  const events = {
    onDoubleClick: () => {
      if (!enableBezier) return;
      onInterpolationChange({
        type: "bezier",
        p1: { x: -25, y: 0 },
        p2: { x: 25, y: 0 },
      });
    },
    onMouseDown: (event: React.MouseEvent) => {
      event.stopPropagation();
      setMoving(true);
    },
    onMouseUp: () => setMoving(false),
    onClick: (event: React.MouseEvent) => {
      if (event.ctrlKey) onSelect?.(false);
      else onSelect?.(true);
    },
  };

  useEventListener("mouseup", events.onMouseUp);
  useEventListener("mousemove", (event) => {
    const parentRect = parentRef.current?.getBoundingClientRect();
    if (!moving || !parentRect) {
      return;
    }

    const cursor = {
      x: minmax(event.clientX - parentRect.left, 0, parentRect.width),
      y: minmax(event.clientY - parentRect.top, 0, parentRect.height),
    };

    if (cursor.x < 0 || cursor.y < 0) return;
    if (cursor.x > parentRect.width || cursor.y > parentRect.height) return;

    onPositionChange(
      minmax(cursor.x, 0, parentRect.width),
      minmax(cursor.y, 0, parentRect.height),
    );
  });

  const onInterpolationPositionChange = (
    point: "p1" | "p2",
    movementX: number,
    movementY: number,
  ) => {
    if (keyframe.interpolation?.type !== "bezier") return;

    onInterpolationChange({
      ...keyframe.interpolation,
      [point]: {
        x: movementX,
        y: movementY,
      },
    });
  };

  return (
    <g id={`kf-${keyframe.time}`}>
      {selected && enableBezier && (
        <>
          {!isFirst && (
            <InterpolationHandle
              onPositionChange={(movementX, movementY) =>
                onInterpolationPositionChange("p1", movementX, movementY)
              }
              point="p1"
              keyframe={keyframe}
            />
          )}
          {!isLast && (
            <InterpolationHandle
              onPositionChange={(movementX, movementY) =>
                onInterpolationPositionChange("p2", movementX, movementY)
              }
              point="p2"
              keyframe={keyframe}
            />
          )}
        </>
      )}
      <rect
        {...events}
        x={keyframe.position.x - size / 2}
        y={keyframe.position.y - size / 2}
        width={size}
        height={size}
        strokeWidth={KeyframePathOptions.Keyframe.StrokeWidth}
        className={clsx(styles.keyframe, {
          [styles["keyframe--selected"]]: selected,
        })}
      />
    </g>
  );
}

export default selectable(Keyframe);
