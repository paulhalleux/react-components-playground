import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Keyframe, KeyframePath } from "@paulhalleux/react-playground";

import { ThemeType, useTheme } from "../../src/contexts/theme-context";
import { ExampleMetadata, ExampleRef } from "../components";

export const KeyframePathExample = forwardRef<ExampleRef>(({}, ref) => {
  const { theme } = useTheme();

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

  useImperativeHandle(
    ref,
    () => ({
      reset: onReset,
    }),
    [onReset],
  );

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <KeyframePath
        parentRef={containerRef}
        keyframes={keyframes}
        onKeyframeChange={onKeyframeChange}
        enablePathMove
        enableBezier
        selectedKeyframes={selectedKeyframes}
        onKeyframeSelect={setSelectedKeyframes}
        pathColor={theme === ThemeType.Light ? [0, 0, 0] : [255, 255, 255]}
      />
    </div>
  );
});

export const metadata: ExampleMetadata = {
  name: "KeyframePath",
  component: KeyframePathExample,
};
