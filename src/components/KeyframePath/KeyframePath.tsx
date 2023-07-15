import { Keyframe as KeyframeType, Point } from "../../types";

import styles from "./KeyframePath.module.scss";
import React, { CSSProperties } from "react";
import { Keyframe } from "../Keyframe";

export type KeyframePathProps = {
  parentRef: React.RefObject<HTMLDivElement>;
  keyframes: KeyframeType[];
  onKeyframeMove: (index: number, position: Point) => void;
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

      {keyframes.slice(1).map((keyframe, index) => (
        <path
          key={keyframe.time}
          d={`
            M ${keyframes[index].position.x} ${keyframes[index].position.y}
            L ${keyframe.position.x} ${keyframe.position.y}
          `}
          fill={"none"}
          className={styles["keyframe-path__drag"]}
          strokeWidth="7"
        />
      ))}

      <g>
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
