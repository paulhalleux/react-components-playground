import React, { JSX, PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Container.module.scss";

type ContainerProps = PropsWithChildren<{
  as?: keyof JSX.IntrinsicElements;
  wrapperClassName?: string;
  className?: string;
  wrapped?: boolean;
}>;

export function Container({
  as: Component = "div",
  children,
  className,
  wrapperClassName,
  wrapped = false,
}: ContainerProps) {
  if (wrapped) {
    const containerProps = {
      className: wrapperClassName,
    };

    return (
      <Component {...containerProps}>
        <div className={clsx(styles.container, className)}>{children}</div>
      </Component>
    );
  }

  return (
    <Component className={clsx(styles.container, className)}>
      {children}
    </Component>
  );
}
