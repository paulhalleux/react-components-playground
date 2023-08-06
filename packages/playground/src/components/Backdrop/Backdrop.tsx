import clsx from "clsx";
import { motion } from "framer-motion";

import { BaseProps } from "../../types";

import styles from "./Backdrop.module.scss";

type BackdropProps = {
  /**
   * Callback fired when the backdrop is clicked.
   */
  onClick?: () => void;
} & BaseProps;

export function Backdrop({ onClick, className, ...rest }: BackdropProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={clsx(styles.backdrop, className)}
      onClick={onClick}
      {...rest}
    />
  );
}
