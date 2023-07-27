import { Point } from "../../types";

export type KeyframeChangeFn = (
  keyframeIndex: number,
  keyframe: Partial<Keyframe>,
) => void;

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
