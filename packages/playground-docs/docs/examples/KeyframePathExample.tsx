import { useRef, useState } from "react";
import { Keyframe, KeyframePath } from "@paulhalleux/react-playground";

import { Display } from "../components";

export function KeyframePathExample() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedKeyframes, setSelectedKeyframes] = useState<number[]>([]);
  const [keyframes, setKeyframes] = useState<Keyframe[]>([
    { position: { x: 100, y: 50 }, time: 1 },
    { position: { x: 200, y: 150 }, time: 2 },
    { position: { x: 300, y: 75 }, time: 3 },
  ]);

  const onKeyframeChange = (keyframe: number, partial: Partial<Keyframe>) =>
    setKeyframes((prev) => {
      const next = [...prev];
      next[keyframe] = { ...next[keyframe], ...partial };
      return next;
    });

  const onReset = () => {
    setKeyframes([
      { position: { x: 100, y: 50 }, time: 1 },
      { position: { x: 200, y: 150 }, time: 2 },
      { position: { x: 300, y: 75 }, time: 3 },
    ]);
    setSelectedKeyframes([]);
  };

  return (
    <Display ref={containerRef} onReset={onReset}>
      <KeyframePath
        parentRef={containerRef}
        keyframes={keyframes}
        onKeyframeChange={onKeyframeChange}
        enablePathMove
        enableBezier
        selectedKeyframes={selectedKeyframes}
        onKeyframeSelect={setSelectedKeyframes}
        pathColor={[255, 255, 255]}
      />
    </Display>
  );
}
