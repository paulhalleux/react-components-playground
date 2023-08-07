import React, { useState } from "react";

import { Button, ButtonVariant } from "../Button";
import { CheckIcon, CloseIcon, IconProps } from "../Icons";
import { Modal, ModalSize } from "../Modal";

import styles from "./ConfirmDialog.module.scss";

export type ConfirmData = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: (() => void) | (() => Promise<void>);
  onCancel: (() => void) | (() => Promise<void>);
  confirmStyle?: ButtonVariant;
  cancelStyle?: ButtonVariant;
  size?: ModalSize;
  icon?: React.FC<IconProps>;
};

export type ConfirmDialogProps = {
  data: ConfirmData | undefined;
  onClose: () => void;
};

export function ConfirmDialog({ data, onClose }: ConfirmDialogProps) {
  const [confirming, setConfirming] = useState(false);
  const [canceling, setCanceling] = useState(false);

  const onConfirm = () => {
    const result = data?.onConfirm();
    if (result instanceof Promise) {
      setConfirming(true);
      result.then(onClose).finally(() => setConfirming(false));
    } else {
      onClose();
    }
  };

  const onCancel = () => {
    const result = data?.onCancel();
    if (result instanceof Promise) {
      setCanceling(true);
      result.then(onClose).finally(() => setCanceling(false));
    } else {
      onClose();
    }
  };

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
            {data.icon && (
              <div className={styles.confirm__icon}>
                <data.icon width={24} height={24} />
              </div>
            )}
            <h2 className={styles.confirm__title}>{data.title}</h2>
            <p className={styles.confirm__description}>{data.description}</p>
          </Modal.Body>
          <Modal.Footer className={styles.dialog__footer}>
            <Button
              className={styles.confirm__button}
              onClick={onConfirm}
              variant={data.confirmStyle ?? "success"}
              loading={confirming}
              disabled={canceling}
            >
              <CheckIcon width={15} height={15} />
              {data.confirmText ?? "Confirm"}
            </Button>
            <Button
              className={styles.confirm__button}
              onClick={onCancel}
              variant={data.cancelStyle ?? "default"}
              loading={canceling}
              disabled={confirming}
            >
              <CloseIcon width={15} height={15} />
              {data.cancelText ?? "Cancel"}
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
