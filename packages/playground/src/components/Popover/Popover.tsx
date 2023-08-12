import React, {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useClickAway, useWindowSize } from "react-use";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { BaseProps } from "../../types";

import { getAnimation } from "./animation";

import styles from "./Popover.module.scss";

export type PopoverTrigger = "hover" | "click";
export type PopoverPosition = "top" | "bottom" | "left" | "right";
export type PopoverAlignment = "start" | "center" | "end";
export type PopoverProps = PropsWithChildren<{
  /**
   * The content of the popover.
   */
  content: ReactNode | ((close: () => void) => ReactNode);
  /**
   * The position of the popover.
   */
  position?: PopoverPosition;
  /**
   * The alignment of the popover.
   */
  alignment?: PopoverAlignment;
  /**
   * The delay of the popover.
   */
  delay?: number;
  /**
   * The trigger of the popover.
   */
  trigger?: PopoverTrigger;
  /**
   * Close the popover when clicking outside.
   */
  closeOnClickOutside?: boolean;
  /**
   * The offset of the popover.
   */
  offset?: number;
  /**
   * Whether to use a portal for the popover.
   */
  usePortal?: boolean;
  /**
   * The id of the portal.
   */
  portalId?: string;
}> &
  BaseProps;

export type PopoverRef = {
  close: () => void;
};

function Popover(
  {
    content,
    children,
    dataTestId,
    className,
    alignment = "center",
    position = "top",
    trigger = "hover",
    closeOnClickOutside = true,
    offset = 5,
    delay = 0,
    usePortal = false,
    style,
    portalId,
  }: PopoverProps,
  ref: React.Ref<PopoverRef>,
) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const enterTimout = useRef<NodeJS.Timeout>();
  const exitTimout = useRef<NodeJS.Timeout>();
  const [active, setActive] = useState(false);

  const [portalPosition, setPortalPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const windowSize = useWindowSize();
  useEffect(() => {
    if (!triggerRef.current || !popoverRef.current) return;
    const { x, y, width, height } = triggerRef.current.getBoundingClientRect();
    const top = y + window.scrollY;
    const left = x + window.scrollX;
    setPortalPosition({ top, left, width, height });
  }, [active, windowSize]);

  const onMouseLeave = () => {
    if (trigger !== "hover") return;
    if (enterTimout.current) clearTimeout(enterTimout.current);
    exitTimout.current = setTimeout(() => setActive(false), delay);
  };

  const onMouseEnter = () => {
    if (trigger !== "hover") return;
    if (exitTimout.current) clearTimeout(exitTimout.current);
    enterTimout.current = setTimeout(() => setActive(true), delay);
  };

  const onClick = () => setActive((prev) => !prev);

  useClickAway(popoverRef, (event) => {
    if (!closeOnClickOutside) return;
    console.log(contentRef.current, event.target);
    if (contentRef.current?.contains(event.target as Node)) return;
    setActive(false);
  });

  useImperativeHandle(ref, () => ({
    close: () => setActive(false),
  }));

  const Content = (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          ref={contentRef}
          className={clsx(
            styles.popover__container,
            styles[`popover--${position}`],
            className,
          )}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={getAnimation(position, alignment)}
          style={
            {
              "--offset": `${offset}px`,
              ...style,
            } as React.CSSProperties
          }
        >
          {typeof content === "function"
            ? content(() => setActive(false))
            : content}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      ref={popoverRef}
      data-test-id={`${dataTestId}-wrapper`}
      className={styles.popover__wrapper}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {usePortal
        ? createPortal(
            <div
              style={{
                position: "absolute",
                ...portalPosition,
              }}
            >
              {Content}
            </div>,
            portalId
              ? document.getElementById(`popover-portal-${portalId}`)!
              : document.body,
          )
        : Content}
      <div
        ref={triggerRef}
        data-test-id={`${dataTestId}-children`}
        className={styles.popover__children}
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}

const ForwardedPopover = forwardRef(Popover);
ForwardedPopover.displayName = "Popover";

export { ForwardedPopover as Popover };
