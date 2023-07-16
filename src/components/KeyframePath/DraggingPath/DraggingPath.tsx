import { Keyframe, PositionChangeFn } from "../../../types";
import styles from "./DraggingPath.module.scss";
import React from "react";
import { useEventListener } from "../../../hooks/use-event-listener";
import { getKeyframePath } from "../../../utils/path";
import { KeyframePathOptions } from "../../../constants/keyframe-path";

export type DraggingPathProps = {
  startKeyframe: Keyframe;
  endKeyframe: Keyframe;
  onPathMove: PositionChangeFn;
};

export function DraggingPath({
  startKeyframe,
  endKeyframe,
  onPathMove,
}: DraggingPathProps) {
  const [dragging, setDragging] = React.useState(false);

  const events = {
    onMouseDown: () => setDragging(true),
    onMouseUp: () => setDragging(false),
  };

  useEventListener("mouseup", events.onMouseUp);
  useEventListener("mousemove", (event: MouseEvent) => {
    if (!dragging) {
      return;
    }

    onPathMove(event.movementX, event.movementY);
  });

  return (
    <path
      {...events}
      d={`M ${startKeyframe.position.x} ${
        startKeyframe.position.y
      } ${getKeyframePath(startKeyframe, endKeyframe)}`}
      fill={"none"}
      className={styles["keyframe-path__drag"]}
      strokeWidth={KeyframePathOptions.Path.InteractionWidth}
    />
  );
}
