import React, { PropsWithChildren, useState } from "react";
import { SelectorProvider, useSelectorContext } from "./SelectorContext";
import { useEventListener } from "../../hooks/use-event-listener";
import { Point, Size } from "../../types";

import styles from "./Selector.module.scss";
import clsx from "clsx";
import { minmax } from "../../utils/math";

export type SelectorProps = PropsWithChildren<{
  parentRef: React.RefObject<HTMLElement>;
}>;

export function Selector({ children, parentRef }: SelectorProps) {
  return (
    <SelectorProvider>
      <SelectorInner parentRef={parentRef}>{children}</SelectorInner>
    </SelectorProvider>
  );
}

function SelectorInner({ children, parentRef }: SelectorProps) {
  const { selectables } = useSelectorContext();

  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });
  const [selecting, setSelecting] = useState(false);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const events = {
    onMouseDown: (event: React.MouseEvent) => {
      setSelecting(true);
      const parentRect = parentRef.current?.getBoundingClientRect();
      if (!parentRect) {
        return;
      }

      const { clientX, clientY } = event;
      const x = clientX - parentRect.left;
      const y = clientY - parentRect.top;
      setStartPoint({ x, y });
    },
    onMouseUp: () => {
      setSelecting(false);
      setSize({ width: 0, height: 0 });
    },
  };

  const style = {
    left: size.width < 0 ? startPoint.x + size.width : startPoint.x,
    top: size.height < 0 ? startPoint.y + size.height : startPoint.y,
    width: Math.abs(size.width),
    height: Math.abs(size.height),
  };

  useEventListener("mouseup", events.onMouseUp);
  useEventListener("mousemove", (event) => {
    const parentRect = parentRef.current?.getBoundingClientRect();
    if (!selecting || !parentRect) {
      return;
    }

    const { clientX, clientY } = event;

    const boundedX = minmax(clientX, parentRect.left, parentRect.right);
    const boundedY = minmax(clientY, parentRect.top, parentRect.bottom);

    const x = boundedX - parentRect.left;
    const y = boundedY - parentRect.top;
    setSize({ width: x - startPoint.x, height: y - startPoint.y });

    selectables.forEach((selectable) => {
      const position = selectable.position;
      const inside =
        position.x > style.left &&
        position.x < style.left + style.width &&
        position.y > style.top &&
        position.y < style.top + style.height;

      if (inside) {
        !selectable.selected && selectable.onSelect?.(true);
      } else {
        selectable.selected && selectable.onSelect?.(false);
      }
    });
  });

  return (
    <div {...events} className={styles.selector}>
      <div
        className={clsx(styles.selector__selection, {
          [styles["selector__selection--active"]]: selecting,
        })}
        style={style}
      />
      {children}
    </div>
  );
}
