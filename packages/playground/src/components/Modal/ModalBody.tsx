import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Modal.module.scss";

type ModalBodyProps = PropsWithChildren & BaseProps;

export function ModalBody({ children, className }: ModalBodyProps) {
  return <div className={clsx(styles.modal__body, className)}>{children}</div>;
}
