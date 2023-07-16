import {
  Interpolation,
  Keyframe as KeyframeType,
  KeyframeChangeFn,
} from "../../types";

import styles from "./KeyframePath.module.scss";
import React, { CSSProperties } from "react";
import { Keyframe } from "./Keyframe";
import { DraggingPath } from "./DraggingPath";
import { useMovePath } from "../../hooks/use-move-path";
import { getKeyframePath } from "../../utils/path";
import { KeyframePathOptions } from "../../constants/keyframe-path";

export type KeyframePathProps = {
  parentRef: React.RefObject<HTMLDivElement>;
  keyframes: KeyframeType[];
  onKeyframeChange: KeyframeChangeFn;
  pathColor?: [number, number, number];
  selectedKeyframe?: number;
  onKeyframeSelect?: (index: number | undefined) => void;
};

export function KeyframePath({
  parentRef,
  keyframes,
  onKeyframeChange,
  pathColor = [32, 58, 75],
  selectedKeyframe,
  onKeyframeSelect,
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

      <g id="keyframes">
        {keyframes.map((keyframe, index) => (
          <Keyframe
            isFirst={index === 0}
            isLast={index === keyframes.length - 1}
            onInterpolationChange={(interpolation) =>
              onInterpolationChange(index, interpolation)
            }
            onPositionChange={(position) =>
              onKeyframeChange(index, { position })
            }
            selected={index === selectedKeyframe}
            onSelect={(selected) =>
              onKeyframeSelect?.(selected ? index : undefined)
            }
            keyframe={keyframe}
            key={keyframe.time}
            parentRef={parentRef}
          />
        ))}
      </g>
    </svg>
  );
}
