import { Keyframe as KeyframeType, KeyframeMoveFn } from "../../types";

import styles from "./KeyframePath.module.scss";
import React, { CSSProperties } from "react";
import { Keyframe } from "../Keyframe";
import { DraggingPath } from "./DraggingPath/DraggingPath";
import { useMovePath } from "../../hooks/use-move-path";

export type KeyframePathProps = {
  parentRef: React.RefObject<HTMLDivElement>;
  keyframes: KeyframeType[];
  onKeyframeMove: KeyframeMoveFn;
  pathColor?: [number, number, number];
};

export function KeyframePath({
  parentRef,
  keyframes,
  onKeyframeMove,
  pathColor = [32, 58, 75],
}: KeyframePathProps) {
  const style = {
    "--path-color": pathColor.join(","),
  } as CSSProperties;

  const { onPathMove } = useMovePath(parentRef, onKeyframeMove, keyframes);

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
            .map(
              (keyframe) => `L ${keyframe.position.x} ${keyframe.position.y}`,
            )
            .join(" ")}
        `}
        fill={"none"}
        className={styles["keyframe-path"]}
        strokeWidth="1"
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
            onPositionChange={(position) => onKeyframeMove(index, position)}
            keyframe={keyframe}
            key={keyframe.time}
            parentRef={parentRef}
          />
        ))}
      </g>
    </svg>
  );
}
