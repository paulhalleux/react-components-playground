import React from "react";

import { Button, ButtonSize } from "../../Button";
import { CheckIcon, CloseIcon } from "../../Icons";
import { ConfirmData } from "../ConfirmDialog";

import styles from "../ConfirmDialog.module.scss";

type PickConfirmData =
  | "onConfirm"
  | "onCancel"
  | "confirmStyle"
  | "cancelStyle"
  | "confirmText"
  | "cancelText";
type ConfirmButtonsProps = Pick<ConfirmData, PickConfirmData> & {
  confirming?: boolean;
  canceling?: boolean;
  size?: ButtonSize;
};

export function ConfirmButtons({
  onConfirm,
  confirmStyle,
  confirmText,
  cancelText,
  onCancel,
  cancelStyle,
  confirming,
  canceling,
  size,
}: ConfirmButtonsProps) {
  return (
    <>
      <Button
        size={size}
        className={styles.confirm__button}
        onClick={onConfirm}
        variant={confirmStyle ?? "success"}
        loading={confirming}
        disabled={canceling}
      >
        <CheckIcon width={15} height={15} />
        {confirmText ?? "Confirm"}
      </Button>
      <Button
        size={size}
        className={styles.confirm__button}
        onClick={onCancel}
        variant={cancelStyle ?? "default"}
        loading={canceling}
        disabled={confirming}
      >
        <CloseIcon width={15} height={15} />
        {cancelText ?? "Cancel"}
      </Button>
    </>
  );
}
