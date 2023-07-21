import { useRef, useState } from "react";

import { FrameSelector, KeyframePath } from "../components";
import { CrossHead } from "../components/FrameSelector/CrossHead/CrossHead";
import { Selector } from "../components/Selector/Selector";
import { Point, Size } from "../types";
import { Keyframe } from "../types/keyframes";

import styles from "./App.module.scss";

export function App() {
  const frameSelectionRef = useRef<HTMLDivElement>(null);
  const keyframesRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<Size>({ width: 100, height: 100 });
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });

  const [selectedKeyframes, setSelectedKeyframes] = useState<number[]>();
  const [keyframes, setKeyframes] = useState<Keyframe[]>([
    {
      position: { x: 25, y: 25 },
      time: 0,
    },
    {
      position: { x: 100, y: 100 },
      time: 1,
      interpolation: {
        type: "bezier",
        p1: { x: -25, y: 0 },
        p2: { x: 25, y: 0 },
      },
    },
    { position: { x: 200, y: 52 }, time: 2 },
    { position: { x: 300, y: 100 }, time: 3 },
    { position: { x: 400, y: 28 }, time: 4 },
    { position: { x: 500, y: 100 }, time: 5 },
  ]);

  return (
    <div className={styles.app}>
      <div className={styles.section}>
        <div className={styles.frame__container} ref={frameSelectionRef}>
          <FrameSelector
            parentRef={frameSelectionRef}
            size={size}
            onSizeChange={setSize}
            position={position}
            onPositionChange={setPosition}
            color={[32, 58, 75]}
          >
            <CrossHead />
          </FrameSelector>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.frame__container} ref={keyframesRef}>
          <Selector parentRef={keyframesRef}>
            <KeyframePath
              enableBezier
              parentRef={keyframesRef}
              keyframes={keyframes}
              selectedKeyframes={selectedKeyframes}
              onKeyframeSelect={setSelectedKeyframes}
              onKeyframeChange={(index, partial) => {
                setKeyframes((keyframes) => {
                  const newKeyframes = [...keyframes];
                  newKeyframes[index] = {
                    ...newKeyframes[index],
                    ...partial,
                  };
                  return newKeyframes;
                });
              }}
            />
          </Selector>
        </div>
      </div>
    </div>
  );
}
