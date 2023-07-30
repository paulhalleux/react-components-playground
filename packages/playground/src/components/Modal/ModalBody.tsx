import { PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Modal.module.scss";

type ModalBodyProps = PropsWithChildren<{
  className?: string;
}>;

export function ModalBody({ children, className }: ModalBodyProps) {
  return <div className={clsx(styles.modal__body, className)}>{children}</div>;
}
