import React, { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { BaseProps } from "../../types";
import { Backdrop } from "../Backdrop";

import { ModalProvider } from "./modal-context";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";

import styles from "./Modal.module.scss";

export type ModalSize = "small" | "medium" | "large" | "full";
export type ModalAlign = "top" | "center" | "bottom";
export type ModalProps = PropsWithChildren<{
  /**
   * Whether the modal is open.
   */
  open?: boolean;
  /**
   * Callback fired when the modal is closed.
   */
  onClose?: () => void;
  /**
   * The size of the modal.
   */
  size?: ModalSize;
  /**
   * Whether the modal closes when the backdrop is clicked.
   */
  closeOnBackdropClick?: boolean;
  /**
   * The minimum height of the modal.
   */
  minHeight?: number;
  /**
   * The vertical alignment of the modal.
   */
  align?: ModalAlign;
}> &
  BaseProps;

export function Modal({
  open,
  children,
  onClose,
  size = "medium",
  closeOnBackdropClick = true,
  minHeight,
  align = "center",
  className,
  style,
  ...rest
}: ModalProps) {
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
          className={styles.modal__container}
          style={{
            alignItems:
              align === "center"
                ? "center"
                : align === "top"
                ? "flex-start"
                : "flex-end",
            ...style,
          }}
          {...rest}
        >
          <Backdrop onClick={closeOnBackdropClick ? onClose : undefined} />
          <ModalProvider onClose={onClose}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                scale: { duration: 0.2 },
                opacity: { duration: 0.1 },
              }}
              className={clsx(
                styles.modal__content,
                styles[`modal__content--${size}`],
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

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
