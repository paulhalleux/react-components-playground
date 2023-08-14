import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../../types";

import styles from "../Card.module.scss";

type CardBodyProps = PropsWithChildren & BaseProps;

export function CardBody({ children, className, ...rest }: CardBodyProps) {
  return (
    <div className={clsx(styles.card__body, className)} {...rest}>
      {children}
    </div>
  );
}
