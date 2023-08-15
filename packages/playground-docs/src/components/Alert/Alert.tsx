import React, { PropsWithChildren } from "react";
import { IconProps } from "@paulhalleux/react-playground";
import clsx from "clsx";

import styles from "./Alert.module.scss";

type AlertProps = PropsWithChildren<{
  icon?: React.FC<IconProps>;
  variant?: "info" | "warning" | "danger" | "success" | "default";
}>;

export function Alert({
  children,
  variant = "default",
  icon: Icon,
}: AlertProps) {
  return (
    <p className={clsx(styles.alert, variant && styles[`alert--${variant}`])}>
      {Icon && (
        <div className={styles.alert__icon}>
          <Icon size={20} />
        </div>
      )}
      <div>{children}</div>
    </p>
  );
}
