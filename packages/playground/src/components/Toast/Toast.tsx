import React from "react";
import clsx from "clsx";

import { IconProps } from "../Icons";

import styles from "./Toast.module.scss";

export type ToastProps = {
  icon?: React.FC<IconProps>;
  title?: string;
  content: string;
  type?: "primary" | "success" | "warning" | "error" | "default";
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
  actionLabel?: string;
  onAction?: () => void;
};

export function Toast({
  title,
  content,
  type = "default",
  closable = true,
  onClose,
  actionLabel,
  onAction,
  icon: Icon,
}: ToastProps) {
  return (
    <div className={clsx(styles.toast, styles[`toast--${type}`])}>
      {Icon && (
        <div className={styles.toast__icon}>
          {<Icon height={16} width={16} />}
        </div>
      )}
      <div className={styles.toast__content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.content}>{content}</p>
      </div>
      {(closable || actionLabel) && (
        <div className={styles.toast__actions}>
          {actionLabel && (
            <button className={styles.toast__action} onClick={onAction}>
              {actionLabel}
            </button>
          )}
          {closable && (
            <button className={styles.toast__action} onClick={onClose}>
              Close
            </button>
          )}
        </div>
      )}
    </div>
  );
}
