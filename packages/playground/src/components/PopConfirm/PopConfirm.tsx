import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { ButtonSize } from "../Button";
import { ConfirmData } from "../ConfirmDialog";
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";
import { useConfirmActions } from "../ConfirmDialog/use-confirm-actions";
import { Popover, PopoverRef } from "../Popover";

import styles from "./PopConfirm.module.scss";

export type PopConfirmProps = PropsWithChildren<
  Omit<ConfirmData, "size" | "icon">
> &
  BaseProps & {
    size?: ButtonSize;
  };

export function PopConfirm({
  children,
  confirmText,
  confirmStyle,
  cancelText,
  cancelStyle,
  className,
  size = "small",
  description,
  title,
  dataTestId,
  ...rest
}: PopConfirmProps) {
  const popoverRef = React.useRef<PopoverRef>(null);

  const { onConfirm, confirming, onCancel, canceling } = useConfirmActions({
    onClose: () => popoverRef.current?.close(),
    onConfirm: rest.onConfirm,
    onCancel: rest.onCancel,
  });

  return (
    <Popover
      ref={popoverRef}
      trigger="click"
      dataTestId={dataTestId}
      closeOnClickOutside={false}
      offset={10}
      content={
        <div className={clsx(styles.confirm, className)}>
          <div className={styles.confirm__body}>
            <h2 className={styles.confirm__title}>{title}</h2>
            <p className={styles.confirm__description}>{description}</p>
          </div>
          <div className={styles.confirm__footer}>
            <ConfirmDialog.Buttons
              size={size}
              onConfirm={onConfirm}
              onCancel={onCancel}
              confirmStyle={confirmStyle}
              cancelStyle={cancelStyle}
              confirmText={confirmText}
              cancelText={cancelText}
              confirming={confirming}
              canceling={canceling}
            />
          </div>
        </div>
      }
    >
      {children}
    </Popover>
  );
}
