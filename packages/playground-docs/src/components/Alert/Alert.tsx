import React, { PropsWithChildren } from "react";
import { BaseProps, IconProps } from "@paulhalleux/react-playground";
import clsx from "clsx";

import styles from "./Alert.module.scss";

type AlertProps = PropsWithChildren<{
  icon?: React.FC<IconProps>;
  variant?: "info" | "warning" | "danger" | "success" | "default";
}> &
  BaseProps;

export function Alert({
  children,
  variant = "default",
  icon: Icon,
  className,
  ...rest
}: AlertProps) {
  return (
    <p
      className={clsx(
        styles.alert,
        variant && styles[`alert--${variant}`],
        className,
      )}
      {...rest}
    >
      {Icon && (
        <div className={styles.alert__icon}>
          <Icon size={20} />
        </div>
      )}
      <div>{children}</div>
    </p>
  );
}
