import React, { JSX, PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Container.module.scss";

type ContainerProps = PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements;
  containerClassName?: string;
  className?: string;
}>;

export function Container({
  as: Component = "div",
  children,
  className,
  containerClassName,
}: ContainerProps) {
  const containerProps = {
    className: containerClassName,
  };

  return (
    <Component {...containerProps}>
      <div className={clsx(styles.container, className)}>{children}</div>
    </Component>
  );
}
