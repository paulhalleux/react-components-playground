import { Keyframe as KeyframeType } from "../types/keyframes";

export function getKeyframePath(
  prevKeyframe: KeyframeType,
  keyframe: KeyframeType,
) {
  const prevInterpolation = prevKeyframe.interpolation;
  const { interpolation } = keyframe;

  if (prevInterpolation?.type === "bezier") {
    if (interpolation?.type === "bezier") {
      return `C ${prevKeyframe.position.x + prevInterpolation.p2.x} ${
        prevKeyframe.position.y + prevInterpolation.p2.y
      } ${keyframe.position.x + interpolation.p1.x} ${
        keyframe.position.y + interpolation.p1.y
      } ${keyframe.position.x} ${keyframe.position.y}`;
    }
    return `Q ${prevKeyframe.position.x + prevInterpolation.p2.x} ${
      prevKeyframe.position.y + prevInterpolation.p2.y
    } ${keyframe.position.x} ${keyframe.position.y}`;
  }
  if (interpolation?.type === "bezier") {
    return `Q ${keyframe.position.x + interpolation.p1.x} ${
      keyframe.position.y + interpolation.p1.y
    } ${keyframe.position.x} ${keyframe.position.y}`;
  }
  return `L ${keyframe.position.x} ${keyframe.position.y}`;
}
