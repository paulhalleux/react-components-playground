import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../../types";

import styles from "../Header.module.scss";

export type HeaderLogoProps = PropsWithChildren & BaseProps;

export function HeaderLogo({ children, className, ...rest }: HeaderLogoProps) {
  return (
    <div className={clsx(styles.header__logo, className)} {...rest}>
      {children}
    </div>
  );
}
