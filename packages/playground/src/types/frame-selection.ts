import { Point } from "./index";

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

export enum HandleType {
  Corner = "corner",
  Border = "border",
  Move = "move",
}

export type FrameResizeFn = (
  handlePosition: HandlePosition,
  cursorPosition: Point,
) => void;

export type FrameMoveFn = (cursorPosition: Point, cursorDelta: Point) => void;
