import React, { PropsWithChildren } from "react";
import { BaseProps, Icon, IconProps } from "@paulhalleux/react-playground";
import clsx from "clsx";

import styles from "./Alert.module.scss";

type AlertProps = PropsWithChildren<{
  icon?: IconProps["name"];
  variant?: "info" | "warning" | "danger" | "success" | "default";
}> &
  BaseProps;

export function Alert({
  children,
  variant = "default",
  icon,
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
      {icon && (
        <div className={styles.alert__icon}>
          <Icon name={icon} size={20} />
        </div>
      )}
      <div>{children}</div>
    </p>
  );
}
