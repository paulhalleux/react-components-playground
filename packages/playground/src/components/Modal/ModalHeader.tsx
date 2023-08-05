import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { CloseButton } from "../CloseButton";

import { useModal } from "./modal-context";

import styles from "./Modal.module.scss";

type ModalHeaderProps = PropsWithChildren<{
  /**
   * Whether the modal is closeable.
   */
  closeable?: boolean;
}> &
  BaseProps;

export function ModalHeader({
  children,
  className,
  closeable,
}: ModalHeaderProps) {
  const { onClose } = useModal();

  return (
    <div className={clsx(styles.modal__header)}>
      <div className={className}>{children}</div>
      {closeable && (
        <CloseButton onClick={onClose} size="x-large" variant="default" />
      )}
    </div>
  );
}
