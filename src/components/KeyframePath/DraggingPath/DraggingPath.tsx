import { Keyframe, Point } from "../../../types";
import styles from "./DraggingPath.module.scss";
import React from "react";
import { useEventListener } from "../../../hooks/use-event-listener";
import { getKeyframePath } from "../../../utils/path";
import { KeyframePathOptions } from "../../../constants/keyframe-path";

export type DraggingPathProps = {
  startKeyframe: Keyframe;
  endKeyframe: Keyframe;
  onPathMove: (offsetX: number, offsetY: number) => void;
};

export function DraggingPath({
  startKeyframe,
  endKeyframe,
  onPathMove,
}: DraggingPathProps) {
  const [dragging, setDragging] = React.useState(false);
  const [lastPosition, setLastPosition] = React.useState<Point>({
    x: 0,
    y: 0,
  });

  const onMouseDown = (event: React.MouseEvent) => {
    setDragging(true);
    setLastPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEventListener("mouseup", onMouseUp);

  useEventListener("mousemove", (event: MouseEvent) => {
    if (!dragging) {
      return;
    }

    const cursorPosition = {
      x: event.clientX,
      y: event.clientY,
    };

    onPathMove(
      lastPosition.x - cursorPosition.x,
      lastPosition.y - cursorPosition.y,
    );
    setLastPosition(cursorPosition);
  });

  return (
    <path
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      d={`M ${startKeyframe.position.x} ${
        startKeyframe.position.y
      } ${getKeyframePath(startKeyframe, endKeyframe)}`}
      fill={"none"}
      className={styles["keyframe-path__drag"]}
      strokeWidth={KeyframePathOptions.Path.InteractionWidth}
    />
  );
}
