import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../../types";

import styles from "../Card.module.scss";

type CardFooterVariant = "default" | "secondary";
type CardFooterProps = PropsWithChildren<{
  /**
   * Adds a border to the footer.
   */
  border?: boolean;
  /**
   * The variant of the footer.
   */
  variant?: CardFooterVariant;
}> &
  BaseProps;

export function CardFooter({
  children,
  className,
  border,
  variant,
  ...rest
}: CardFooterProps) {
  return (
    <div
      className={clsx(
        styles.card__footer,
        {
          [styles["card__footer--border"]]: border,
          [styles[`card__footer--${variant}`]]: variant,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
