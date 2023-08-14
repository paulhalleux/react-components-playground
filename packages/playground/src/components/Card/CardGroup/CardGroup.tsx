import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../../types";

import styles from "../Card.module.scss";

type CardGroupProps = PropsWithChildren & BaseProps;

export function CardGroup({ children, className, ...rest }: CardGroupProps) {
  return (
    <div className={clsx(styles.card__group, className)} {...rest}>
      {children}
    </div>
  );
}
