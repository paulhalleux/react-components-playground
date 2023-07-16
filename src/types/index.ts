export enum HandleType {
  Corner = "corner",
  Border = "border",
  Move = "move",
}

export type Point = {
  x: number;
  y: number;
};

export enum HandlePosition {
  TopLeft = "top-left",
  Top = "top",
  TopRight = "top-right",
  Right = "right",
  BottomRight = "bottom-right",
  Bottom = "bottom",
  BottomLeft = "bottom-left",
  Left = "left",
}

export type Size = {
  width: number;
  height: number;
};

export type FrameResizeFn = (
  handlePosition: HandlePosition,
  cursorPosition: Point,
) => void;

export type FrameMoveFn = (cursorPosition: Point, cursorDelta: Point) => void;

export type KeyframeChangeFn = (
  keyframeIndex: number,
  keyframe: Partial<Keyframe>,
) => void;

export type PositionChangeFn = (movementX: number, movementY: number) => void;

export type LinearInterpolation = {
  type: "linear";
};

export type BezierInterpolation = {
  type: "bezier";
  p1: Point;
  p2: Point;
};

export type Interpolation = LinearInterpolation | BezierInterpolation;

export type Keyframe = {
  position: Point;
  time: number;
  interpolation?: Interpolation;
};
