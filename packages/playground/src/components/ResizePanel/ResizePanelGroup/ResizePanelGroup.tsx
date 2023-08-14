import React, { PropsWithChildren, useEffect, useMemo } from "react";
import clsx from "clsx";

import { ResizePanelProvider } from "../resize-panel-context";
import { ResizePanel } from "../ResizePanel";

import styles from "./ResizePanelGroup.module.scss";

export type ResizePanelGroupDirection = "horizontal" | "vertical";
export type ResizePanelGroupProps = PropsWithChildren<{
  id: string;
  direction?: ResizePanelGroupDirection;
}>;

export function ResizePanelGroup({
  id,
  direction = "horizontal",
  children,
}: ResizePanelGroupProps) {
  const ChildrenArray = useMemo(
    () => React.Children.toArray(children),
    [children],
  );

  useEffect(() => {
    if (
      ChildrenArray.some(
        (child) =>
          !React.isValidElement(child) || child.type !== ResizePanel.Panel,
      )
    ) {
      throw new Error(
        "ResizePanelGroup can only contain ResizePanel.Panel components",
      );
    }
  }, [ChildrenArray]);

  const Content = (
    <div
      className={clsx(
        styles["resize-panel__group"],
        styles[`resize-panel__group--${direction}`],
      )}
    >
      {ChildrenArray.map((child, index) => {
        const nextChild = ChildrenArray[index + 1];
        if (!React.isValidElement(child)) return null;

        return (
          <React.Fragment key={child.props.id}>
            {child}
            {index !== ChildrenArray.length - 1 && (
              <ResizePanel.Handle
                leftPanelId={child.props.id}
                rightPanelId={
                  React.isValidElement(nextChild) ? nextChild.props.id : ""
                }
                direction={direction}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <ResizePanelProvider id={id} direction={direction}>
      {Content}
    </ResizePanelProvider>
  );
}
