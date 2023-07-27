import React, { CSSProperties, PropsWithChildren } from "react";

import { useFramePosition } from "../../hooks/use-frame-position";
import { useFrameSize } from "../../hooks/use-frame-size";
import { Point, Size } from "../../types";

import { MoveHandle } from "./MoveHandle";
import { ResizeHandle } from "./ResizeHandle";
import { HandlePosition, HandleType } from "./types";

import styles from "./FrameSelector.module.scss";

export type FrameSelectorProps = PropsWithChildren<{
  parentRef: React.RefObject<HTMLElement>;
  size: Size;
  minSize?: Size;
  maxSize?: Size;
  onSizeChange: (size: Size) => void;
  position: Point;
  onPositionChange: (position: Point) => void;
  color?: [number, number, number];
}>;

const Handles = {
  CornerTopLeft: [HandleType.Corner, HandlePosition.TopLeft],
  CornerTopRight: [HandleType.Corner, HandlePosition.TopRight],
  CornerBottomRight: [HandleType.Corner, HandlePosition.BottomRight],
  CornerBottomLeft: [HandleType.Corner, HandlePosition.BottomLeft],

  BorderTop: [HandleType.Border, HandlePosition.Top],
  BorderRight: [HandleType.Border, HandlePosition.Right],
  BorderBottom: [HandleType.Border, HandlePosition.Bottom],
  BorderLeft: [HandleType.Border, HandlePosition.Left],
} as const;

export function FrameSelector({
  parentRef,
  size,
  minSize = { width: 15, height: 15 },
  maxSize = { width: 200, height: 200 },
  onSizeChange,
  position,
  onPositionChange,
  children,
  color = [19, 132, 225],
}: FrameSelectorProps) {
  const { onResize } = useFrameSize(
    parentRef,
    size,
    minSize,
    maxSize,
    position,
    onSizeChange,
    onPositionChange,
  );

  const { onMove } = useFramePosition(
    parentRef,
    size,
    position,
    onPositionChange,
  );

  const style = {
    "--width": `${size.width}px`,
    "--height": `${size.height}px`,
    "--frame-color": color?.join(","),
    transform: `translate(${position.x}px, ${position.y}px)`,
  } as CSSProperties;

  return (
    <div className={styles["frame-selector"]} style={style}>
      {Object.entries(Handles).map(([key, [type, handlePosition]]) => (
        <ResizeHandle
          key={key}
          type={type}
          parentRef={parentRef}
          position={handlePosition}
          onResize={onResize}
        />
      ))}
      <MoveHandle parentRef={parentRef} onMove={onMove}>
        {children}
      </MoveHandle>
    </div>
  );
}
