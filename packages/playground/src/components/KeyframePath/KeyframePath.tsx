import React, { CSSProperties } from "react";

import { KeyframePathOptions } from "../../constants/keyframe-path";
import { getKeyframePath } from "../../utils/path";

import { DraggingPath } from "./DraggingPath";
import { Keyframe } from "./Keyframe";
import {
  Interpolation,
  Keyframe as KeyframeType,
  KeyframeChangeFn,
} from "./types";
import { useMovePath } from "./use-move-path";

import styles from "./KeyframePath.module.scss";

export type KeyframePathProps = {
  parentRef: React.RefObject<HTMLDivElement>;
  keyframes: KeyframeType[];
  onKeyframeChange: KeyframeChangeFn;
  pathColor?: [number, number, number];
  selectedKeyframes?: number[];
  onKeyframeSelect?: (index: number[]) => void;
  enableBezier?: boolean;
  enablePathMove?: boolean;
};

export function KeyframePath({
  parentRef,
  keyframes,
  onKeyframeChange,
  pathColor = [32, 58, 75],
  selectedKeyframes,
  onKeyframeSelect,
  enablePathMove,
  enableBezier,
}: KeyframePathProps) {
  const style = {
    "--path-color": pathColor.join(","),
  } as CSSProperties;

  const { onPathMove } = useMovePath(parentRef, onKeyframeChange, keyframes);
  const onInterpolationChange = (
    index: number,
    interpolation: Interpolation,
  ) => {
    onKeyframeChange(index, {
      ...keyframes[index],
      interpolation,
    });
  };

  const onKeyframePositionChange = (
    index: number,
    movementX: number,
    movementY: number,
  ) => {
    onKeyframeChange(index, {
      position: {
        x: movementX,
        y: movementY,
      },
    });
  };

  const onSelectKeyframe = (index: number, selected: boolean) => {
    if (!selectedKeyframes) selectedKeyframes = [];
    if (selected) {
      if (!selectedKeyframes.includes(index))
        onKeyframeSelect?.([...selectedKeyframes, index]);
    } else {
      onKeyframeSelect?.(selectedKeyframes.filter((i) => i !== index));
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={styles["keyframe-path__container"]}
      width="100%"
      height="100%"
    >
      <path
        d={`
          M ${keyframes[0].position.x} ${keyframes[0].position.y}
          ${keyframes
            .slice(1)
            .map((keyframe, index) =>
              getKeyframePath(keyframes[index], keyframe),
            )
            .join(" ")}
        `}
        fill="none"
        className={styles["keyframe-path"]}
        strokeWidth={KeyframePathOptions.Path.StrokeWidth}
      />

      {enablePathMove && (
        <g id="dragging-paths">
          {keyframes.slice(1).map((keyframe, index) => (
            <DraggingPath
              key={keyframe.time}
              startKeyframe={keyframes[index]}
              endKeyframe={keyframe}
              onPathMove={(oX, oY) => onPathMove(index, index + 1, oX, oY)}
            />
          ))}
        </g>
      )}

      <g id="keyframes">
        {keyframes.map((keyframe, index) => (
          <Keyframe
            isFirst={index === 0}
            isLast={index === keyframes.length - 1}
            onInterpolationChange={(interpolation) =>
              onInterpolationChange(index, interpolation)
            }
            onPositionChange={(movementX, movementY) =>
              onKeyframePositionChange(index, movementX, movementY)
            }
            selected={selectedKeyframes?.includes(index)}
            onSelect={(selected) => onSelectKeyframe(index, selected)}
            keyframe={keyframe}
            key={keyframe.time}
            parentRef={parentRef}
            enableBezier={enableBezier}
            id={`keyframe-${index}`}
            position={keyframe.position}
          />
        ))}
      </g>
    </svg>
  );
}
