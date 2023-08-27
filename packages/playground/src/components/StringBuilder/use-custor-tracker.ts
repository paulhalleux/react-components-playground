import React, { useEffect, useState } from "react";

export type CursorPosition = {
  start: number;
  end: number;
};

const eventList = ["input", "mouseup", "mousedown", "keydown"];

export const useCursorTracker = (
  ref: React.RefObject<HTMLElement | null>,
): CursorPosition => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    start: 0,
    end: 0,
  });

  useEffect(() => {
    const handleSelectionChange = () => {
      if (ref.current) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const startOffset = getOffsetWithinElement(
            ref.current,
            range.startContainer,
            range.startOffset,
          );
          const endOffset = getOffsetWithinElement(
            ref.current,
            range.endContainer,
            range.endOffset,
          );

          setCursorPosition({
            start: startOffset,
            end: endOffset,
          });
        }
      }
    };

    if (ref.current) {
      eventList.forEach((event) => {
        ref.current!.addEventListener(event, handleSelectionChange);
      });
    }

    return () => {
      if (ref.current) {
        eventList.forEach((event) => {
          ref.current!.removeEventListener(event, handleSelectionChange);
        });
      }
    };
  }, [ref]);

  return cursorPosition;
};

const getOffsetWithinElement = (
  parent: Node,
  node: Node | null,
  offset: number,
): number => {
  let currentOffset = offset;
  for (
    let i = 0;
    i < parent.childNodes.length && parent.childNodes[i] !== node;
    i++
  ) {
    if (parent.childNodes[i].nodeType === Node.TEXT_NODE) {
      currentOffset += parent.childNodes[i].textContent?.length || 0;
    } else if (parent.childNodes[i].nodeType === Node.ELEMENT_NODE) {
      currentOffset += getOffsetWithinElement(parent.childNodes[i], node, 0);
    }
  }
  return currentOffset;
};
