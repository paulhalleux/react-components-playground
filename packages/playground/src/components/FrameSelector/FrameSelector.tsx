import React, { CSSProperties, PropsWithChildren } from "react";

import { Point, Size } from "../../types";

import { MoveHandle } from "./MoveHandle";
import { ResizeHandle } from "./ResizeHandle";
import { HandlePosition, HandleType } from "./types";
import { useFramePosition } from "./use-frame-position";
import { useFrameSize } from "./use-frame-size";

import styles from "./FrameSelector.module.scss";

export type FrameSelectorProps = PropsWithChildren<{
  /**
   * The parent element of the frame.
   */
  parentRef: React.RefObject<HTMLElement>;
  /**
   * The size of the frame.
   */
  size: Size;
  /**
   * The minimum size of the frame.
   */
  minSize?: Size;
  /**
   * The maximum size of the frame.
   */
  maxSize?: Size;
  /**
   * Callback fired when the size of the frame changes.
   * @param size The new size of the frame.
   */
  onSizeChange: (size: Size) => void;
  /**
   * The position of the frame.
   */
  position: Point;
  /**
   * Callback fired when the position of the frame changes.
   * @param position The new position of the frame.
   */
  onPositionChange: (position: Point) => void;
  /**
   * The color of the frame.
   */
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
