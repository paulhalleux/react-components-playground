import { useEffect, useRef, useState } from "react";
import {
  CrossHead,
  FrameSelector,
  Point,
  Size,
} from "@paulhalleux/react-playground";

import { ThemeType, useTheme } from "../../src/contexts/theme-context";
import { Display } from "../components";

export function FrameSelectorExample() {
  const { theme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [size, setSize] = useState<Size>({ width: 50, height: 50 });

  useEffect(() => {
    const { current } = containerRef;
    if (!current) return;

    const { width, height } = current.getBoundingClientRect();
    setPosition({
      x: width / 2 - size.width / 2,
      y: height / 2 - size.height / 2,
    });
  }, [containerRef]);

  const onReset = () => {
    const { current } = containerRef;
    if (!current) return;

    const { width, height } = current.getBoundingClientRect();
    setSize({ width: 50, height: 50 });
    setPosition({
      x: width / 2 - 50 / 2,
      y: height / 2 - 50 / 2,
    });
  };

  return (
    <Display ref={containerRef} onReset={onReset}>
      <FrameSelector
        parentRef={containerRef}
        color={theme === ThemeType.Light ? [0, 0, 0] : [255, 255, 255]}
        position={position}
        onPositionChange={setPosition}
        size={size}
        onSizeChange={setSize}
        maxSize={{ width: 75, height: 75 }}
        minSize={{ width: 25, height: 25 }}
      >
        <CrossHead />
      </FrameSelector>
    </Display>
  );
}
