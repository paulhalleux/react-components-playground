import { useRef, useState } from "react";
import { Keyframe, KeyframePath } from "@paulhalleux/react-playground";

import { Display } from "../components";

export function KeyframePathExample() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedKeyframes, setSelectedKeyframes] = useState<number[]>([]);
  const [keyframes, setKeyframes] = useState<Keyframe[]>([
    { position: { x: 0, y: 0 }, time: 1 },
    { position: { x: 100, y: 100 }, time: 2 },
    { position: { x: 200, y: 0 }, time: 3 },
  ]);

  const onKeyframeChange = (keyframe: number, partial: Partial<Keyframe>) =>
    setKeyframes((prev) => {
      const next = [...prev];
      next[keyframe] = { ...next[keyframe], ...partial };
      return next;
    });

  return (
    <Display ref={containerRef}>
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
