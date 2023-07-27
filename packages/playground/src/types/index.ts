export * from "./theme";
export * from "./helpers";

export type Point = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type PositionChangeFn = (movementX: number, movementY: number) => void;
