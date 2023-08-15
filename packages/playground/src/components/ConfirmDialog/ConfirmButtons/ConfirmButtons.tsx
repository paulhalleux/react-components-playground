import React from "react";

import { Button, ButtonSize } from "../../Button";
import { CheckIcon, XIcon } from "../../Icons";
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
        <CheckIcon size={15} />
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
        <XIcon size={15} />
        {cancelText ?? "Cancel"}
      </Button>
    </>
  );
}
