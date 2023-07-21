export type Point = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type PositionChangeFn = (movementX: number, movementY: number) => void;

export * from "./keyframes";
export * from "./selector";
export * from "./frame-selection";
