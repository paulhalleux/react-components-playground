import { motion } from "framer-motion";

import styles from "./Backdrop.module.scss";

type BackdropProps = {
  /**
   * Callback fired when the backdrop is clicked.
   */
  onClick?: () => void;
};

export function Backdrop({ onClick }: BackdropProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.backdrop}
      onClick={onClick}
    />
  );
}
