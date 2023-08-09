import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Modal.module.scss";

type ModalFooterProps = PropsWithChildren & BaseProps;

export function ModalFooter({
  children,
  className,
  ...rest
}: ModalFooterProps) {
  return (
    <div className={clsx(styles.modal__footer, className)} {...rest}>
      {children}
    </div>
  );
}
