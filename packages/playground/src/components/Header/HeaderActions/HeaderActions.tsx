import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../../types";

import styles from "../Header.module.scss";

export type HeaderActionsProps = PropsWithChildren & BaseProps;

export function HeaderActions({
  children,
  className,
  ...rest
}: HeaderActionsProps) {
  return (
    <div className={clsx(styles.header__actions, className)} {...rest}>
      {children}
    </div>
  );
}
