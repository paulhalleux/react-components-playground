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

export type ResizeFn = (
  handlePosition: HandlePosition,
  cursorPosition: Point,
) => void;

export type MoveFn = (cursorPosition: Point, cursorDelta: Point) => void;
