import React, { useEffect, useState } from "react";

export function useOverflow(ref: React.RefObject<HTMLElement>) {
  const [overflow, setOverflow] = useState({ x: false, y: false });
  const [scroll, setScroll] = useState({
    top: 0,
    left: 0,
    maxTop: 0,
    maxLeft: 0,
  });

  useEffect(() => {
    if (!ref.current) return;
    const {
      scrollTop,
      scrollLeft,
      clientWidth,
      clientHeight,
      scrollWidth,
      scrollHeight,
    } = ref.current!;
    setOverflow({
      y: scrollHeight > clientHeight,
      x: scrollWidth > clientWidth,
    });
    setScroll({
      top: scrollTop,
      left: scrollLeft,
      maxLeft: scrollWidth - clientWidth,
      maxTop: scrollHeight - clientHeight,
    });
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      const { scrollHeight, clientHeight, clientWidth, scrollWidth } =
        ref.current!;
      setOverflow({
        y: scrollHeight > clientHeight,
        x: scrollWidth > clientWidth,
      });
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [ref]);

  const onScroll = () => {
    if (!ref.current) return;
    const {
      scrollTop,
      scrollLeft,
      clientWidth,
      clientHeight,
      scrollWidth,
      scrollHeight,
    } = ref.current;
    setScroll({
      top: scrollTop,
      left: scrollLeft,
      maxLeft: scrollWidth - clientWidth,
      maxTop: scrollHeight - clientHeight,
    });
  };

  return { overflow, scroll, onScroll };
}
