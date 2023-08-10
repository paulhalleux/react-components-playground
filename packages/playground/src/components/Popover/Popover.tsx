import React, {
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useClickAway } from "react-use";
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
    delay = 0,
    ...rest
  }: PopoverProps,
  ref: React.Ref<PopoverRef>,
) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const enterTimout = useRef<NodeJS.Timeout>();
  const exitTimout = useRef<NodeJS.Timeout>();
  const [active, setActive] = useState(false);

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

  const onClick = () => {
    if (trigger !== "click") return;
    setActive((prev) => !prev);
  };

  useClickAway(popoverRef, (event) => {
    if (!closeOnClickOutside) return;
    if (contentRef.current?.contains(event.target as Node)) return;
    setActive(false);
  });

  useImperativeHandle(ref, () => ({
    close: () => setActive(false),
  }));

  return (
    <div
      ref={popoverRef}
      data-test-id={`${dataTestId}-wrapper`}
      className={styles.popover__wrapper}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
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
            {...rest}
          >
            {typeof content === "function"
              ? content(() => setActive(false))
              : content}
          </motion.div>
        )}
      </AnimatePresence>
      <div
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

export { ForwardedPopover as Popover };
