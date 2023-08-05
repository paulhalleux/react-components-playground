import React, { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { BaseProps } from "../../types";
import { Backdrop } from "../Backdrop";
import { ModalProvider } from "../Modal/modal-context";
import { ModalBody } from "../Modal/ModalBody";
import { ModalFooter } from "../Modal/ModalFooter";
import { ModalHeader } from "../Modal/ModalHeader";

import styles from "./Drawer.module.scss";

export type DrawerPosition = "left" | "right";
export type DrawerSize = "small" | "medium" | "large" | "full";
export type DrawerProps = PropsWithChildren<{
  /**
   * Whether the drawer is open.
   */
  open?: boolean;
  /**
   * Callback fired when the drawer is closed.
   */
  onClose?: () => void;
  /**
   * The size of the drawer.
   */
  size?: DrawerSize;
  /**
   * Whether the drawer closes when the backdrop is clicked.
   */
  closeOnBackdropClick?: boolean;
  /**
   * The minimum height of the drawer.
   */
  minHeight?: number;
  /**
   * The position of the drawer.
   */
  position?: DrawerPosition;
}> &
  BaseProps;

export function Drawer({
  open,
  children,
  onClose,
  size = "medium",
  closeOnBackdropClick = true,
  minHeight,
  position = "right",
  className,
}: DrawerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
      containerRef.current?.focus();
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [open]);

  const onKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose?.();
    }
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {open && (
        <div
          tabIndex={0}
          ref={containerRef}
          onKeyDown={onKeydown}
          className={styles.drawer__container}
        >
          <Backdrop onClick={closeOnBackdropClick ? onClose : undefined} />
          <ModalProvider onClose={onClose}>
            <motion.div
              initial={{ opacity: 0, x: position === "left" ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: position === "left" ? -100 : 100 }}
              transition={{
                scale: { duration: 0.2 },
                opacity: { duration: 0.1 },
              }}
              className={clsx(
                styles.drawer__content,
                styles[`drawer__content--${size}`],
                styles[`drawer__content--${position}`],
                className,
              )}
              style={{ minHeight }}
            >
              {children}
            </motion.div>
          </ModalProvider>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

Drawer.Body = ModalBody;
Drawer.Header = ModalHeader;
Drawer.Footer = ModalFooter;
