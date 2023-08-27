import React from "react";

import { ButtonVariant } from "../Button";
import { IconProps } from "../Icons";
import { Modal, ModalSize } from "../Modal";

import { ConfirmBody } from "./ConfirmBody";
import { ConfirmButtons } from "./ConfirmButtons";
import { useConfirmActions } from "./use-confirm-actions";

import styles from "./ConfirmDialog.module.scss";

export type ConfirmData = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: (() => void) | (() => Promise<void>);
  onCancel?: (() => void) | (() => Promise<void>);
  confirmStyle?: ButtonVariant;
  cancelStyle?: ButtonVariant;
  size?: ModalSize;
  icon?: IconProps["name"];
};

export type ConfirmDialogProps = {
  data: ConfirmData | undefined;
  onClose: () => void;
};

export function ConfirmDialog({ data, onClose }: ConfirmDialogProps) {
  const { onConfirm, confirming, onCancel, canceling } = useConfirmActions({
    onClose,
    onConfirm: data?.onConfirm,
    onCancel: data?.onCancel,
  });

  return (
    <Modal
      open={!!data}
      onClose={onClose}
      closeOnBackdropClick={false}
      minHeight="auto"
      size={data?.size ?? "small"}
    >
      {data && (
        <>
          <Modal.Body className={styles.dialog__body}>
            <ConfirmBody
              title={data.title}
              description={data.description}
              icon={data.icon}
            />
          </Modal.Body>
          <Modal.Footer className={styles.dialog__footer}>
            <ConfirmButtons
              onConfirm={onConfirm}
              onCancel={onCancel}
              confirmStyle={data.confirmStyle}
              cancelStyle={data.cancelStyle}
              confirmText={data.confirmText}
              cancelText={data.cancelText}
              confirming={confirming}
              canceling={canceling}
            />
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}

ConfirmDialog.Buttons = ConfirmButtons;
ConfirmDialog.Body = ConfirmBody;
