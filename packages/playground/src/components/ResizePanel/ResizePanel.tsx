import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import { useResizePanel } from "./resize-panel-context";
import { ResizePanelGroup } from "./ResizePanelGroup";
import { ResizePanelHandle } from "./ResizePanelHandle";

import styles from "./ResizePanel.module.scss";

export type ResizePanelProps = PropsWithChildren<{
  id: string;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
}> &
  BaseProps;

export function ResizePanel({
  id,
  children,
  dataTestId,
  style,
  className,
}: ResizePanelProps) {
  const { setSize, sizes, direction } = useResizePanel();
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (!panelRef.current) return;
    const rect = panelRef.current?.getBoundingClientRect();
    setSize(id, () => (direction === "horizontal" ? rect.width : rect.height));
  }, [id, panelRef, direction]);

  return (
    <div
      ref={panelRef}
      data-test-id={dataTestId}
      style={{
        ...style,
        width: direction === "horizontal" ? sizes[id] : undefined,
        height: direction === "vertical" ? sizes[id] : undefined,
      }}
      className={clsx(styles["resize-panel"], className)}
    >
      {children}
    </div>
  );
}

ResizePanel.Group = ResizePanelGroup;
ResizePanel.Panel = ResizePanel;
ResizePanel.Handle = ResizePanelHandle;
