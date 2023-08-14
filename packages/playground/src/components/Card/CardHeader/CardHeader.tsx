import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../../types";

import styles from "../Card.module.scss";

type CardHeaderVariant = "default" | "secondary";
type CardHeaderProps = PropsWithChildren<{
  /**
   * Adds a border to the header.
   */
  border?: boolean;
  /**
   * The variant of the header.
   */
  variant?: CardHeaderVariant;
}> &
  BaseProps;

export function CardHeader({
  border,
  children,
  className,
  variant,
  ...rest
}: CardHeaderProps) {
  return (
    <div
      className={clsx(
        styles.card__header,
        {
          [styles["card__header--border"]]: border,
          [styles[`card__header--${variant}`]]: variant,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
