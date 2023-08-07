import { TooltipAlignment, TooltipPosition } from "./Tooltip";

const AnimationMap = {
  top: {
    initial: { opacity: 0, bottom: "calc(100% - 1px)" },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  },
  bottom: {
    initial: { opacity: 0, top: "calc(100% - 1px)" },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  },
  left: {
    initial: { opacity: 0, right: "calc(100% - 1px)" },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  },
  right: {
    initial: { opacity: 0, left: "calc(100% - 1px)" },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  },
};

export function getAnimation(
  position: TooltipPosition,
  alignment: TooltipAlignment,
) {
  const animation = AnimationMap[position];
  if (position === "top" || position === "bottom") {
    return {
      ...animation,
      initial: {
        ...animation.initial,
        left:
          alignment === "start"
            ? "0"
            : alignment === "center"
            ? "50%"
            : undefined,
        right: alignment === "end" ? "0" : undefined,
        x: alignment === "start" ? "0" : alignment === "center" ? "-50%" : "0%",
      },
    };
  }

  return {
    ...animation,
    initial: {
      ...animation.initial,
      top:
        alignment === "start"
          ? "0"
          : alignment === "center"
          ? "50%"
          : undefined,
      bottom: alignment === "end" ? "0" : undefined,
      y: alignment === "start" ? "0" : alignment === "center" ? "-50%" : "0%",
    },
  };
}
