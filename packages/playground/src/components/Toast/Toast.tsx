import React from "react";

import { IconProps } from "../Icons";

import styles from "./Toast.module.scss";

export type ToastProps = {
  icon?: React.FC<IconProps>;
  title?: string;
  content: string;
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
  actionLabel?: string;
  onAction?: () => void;
};

export function Toast({
  title,
  content,
  closable = true,
  onClose,
  actionLabel,
  onAction,
  icon: Icon,
}: ToastProps) {
  return (
    <div className={styles.toast}>
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
