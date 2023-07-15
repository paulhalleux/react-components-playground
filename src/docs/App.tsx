import styles from "./App.module.scss";
import { useRef, useState } from "react";
import { FrameSelector } from "../components";
import { Point, Size } from "../types";

export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ width: 100, height: 100 });
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });

  return (
    <div className={styles.app}>
      <div className={styles.frame__container} ref={containerRef}>
        <FrameSelector
          parentRef={containerRef}
          size={size}
          onSizeChange={setSize}
          position={position}
          onPositionChange={setPosition}
          color={[32, 58, 75]}
        />
      </div>
      <div>
        {JSON.stringify(size)} • {JSON.stringify(position)}
      </div>
    </div>
  );
}
