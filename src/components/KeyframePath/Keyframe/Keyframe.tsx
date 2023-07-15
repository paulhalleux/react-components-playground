import { Interpolation, Keyframe as KeyframeType, Point } from "../../../types";
import styles from "./Keyframe.module.scss";
import React from "react";
import { useEventListener } from "../../../hooks/use-event-listener";
import { minmax } from "../../../utils/math";
import clsx from "clsx";
import { InterpolationHandle } from "../InterpolationHandle";

export type KeyframeProps = {
  parentRef: React.RefObject<HTMLDivElement>;
  isFirst: boolean;
  isLast: boolean;
  keyframe: KeyframeType;
  onPositionChange: (position: Point) => void;
  onInterpolationChange: (interpolation: Interpolation) => void;
  selected: boolean;
  onSelect: () => void;
};

export function Keyframe({
  parentRef,
  isFirst,
  isLast,
  keyframe,
  onPositionChange,
  onInterpolationChange,
  selected,
  onSelect,
}: KeyframeProps) {
  const [moving, setMoving] = React.useState(false);

  const onDoubleClick = () => {
    onInterpolationChange({
      type: "bezier",
      p1: { x: -25, y: 0 },
      p2: { x: 25, y: 0 },
    });
  };

  const onMouseDown = () => {
    onSelect();
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

  const onInterpolatonPositionChange = (
    point: "p1" | "p2",
    position: Point,
  ) => {
    if (!keyframe.interpolation || keyframe.interpolation.type !== "bezier")
      return;
    onInterpolationChange({
      ...keyframe.interpolation,
      [point]: {
        x: keyframe.interpolation[point].x + position.x,
        y: keyframe.interpolation[point].y + position.y,
      },
    });
  };

  return (
    <g>
      {selected && (
        <>
          {!isFirst && (
            <InterpolationHandle
              onPositionChange={(pos) =>
                onInterpolatonPositionChange("p1", pos)
              }
              point="p1"
              keyframe={keyframe}
            />
          )}
          {!isLast && (
            <InterpolationHandle
              onPositionChange={(pos) =>
                onInterpolatonPositionChange("p2", pos)
              }
              point="p2"
              keyframe={keyframe}
            />
          )}
        </>
      )}
      <rect
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onClick={onSelect}
        onDoubleClick={onDoubleClick}
        x={keyframe.position.x - 3.5}
        y={keyframe.position.y - 3.5}
        width={7}
        height={7}
        className={clsx(styles["keyframe"], {
          [styles["keyframe--selected"]]: selected,
        })}
      />
    </g>
  );
}
