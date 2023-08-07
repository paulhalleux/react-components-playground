import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { BaseProps } from "../../types";

import { getAnimation } from "./animation";

import styles from "./Tooltip.module.scss";

export type TooltipTrigger = "hover" | "click";
export type TooltipVariant = "default" | "secondary";
export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipAlignment = "start" | "center" | "end";
export type TooltipProps = PropsWithChildren<{
  /**
   * The content of the tooltip.
   */
  content: ReactNode;
  /**
   * The position of the tooltip.
   */
  position?: TooltipPosition;
  /**
   * The alignment of the tooltip.
   */
  alignment?: TooltipAlignment;
  /**
   * The delay of the tooltip.
   */
  delay?: number;
  /**
   * The variant of the tooltip.
   */
  variant?: TooltipVariant;
  /**
   * The trigger of the tooltip.
   */
  trigger?: TooltipTrigger;
}> &
  BaseProps;

export function Tooltip({
  content,
  children,
  dataTestId,
  className,
  alignment = "center",
  position = "top",
  variant = "default",
  trigger = "hover",
  delay = 300,
  ...rest
}: TooltipProps) {
  const enterTimout = useRef<NodeJS.Timeout>();
  const exitTimout = useRef<NodeJS.Timeout>();
  const [active, setActive] = useState(false);

  const onMouseLeave = () => {
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
    setActive(!active);
  };

  return (
    <div
      data-test-id={`${dataTestId}-wrapper`}
      className={styles.tooltip__wrapper}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            className={clsx(
              styles.tooltip__container,
              styles[`tooltip--${position}`],
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={getAnimation(position, alignment)}
          >
            <div
              data-test-id={`${dataTestId}-tooltip`}
              className={clsx(
                styles.tooltip,
                styles[`tooltip--${variant}`],
                className,
              )}
              {...rest}
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        data-test-id={`${dataTestId}-children`}
        className={styles.tooltip__children}
      >
        {children}
      </div>
    </div>
  );
}
