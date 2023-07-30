import { PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Modal.module.scss";

type ModalFooterProps = PropsWithChildren<{
  className?: string;
}>;

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={clsx(styles.modal__footer, className)}>{children}</div>
  );
}
