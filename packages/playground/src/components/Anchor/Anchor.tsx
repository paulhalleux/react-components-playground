import { PropsWithChildren } from "react";
import { Link, useInRouterContext } from "react-router-dom";
import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Anchor.module.scss";

export type AnchorSize = "small" | "medium" | "large";
export type AnchorProps = PropsWithChildren<{
  /**
   * The URL to link to when the anchor is clicked.
   */
  to: string;
  /**
   * The size of the anchor.
   */
  size?: AnchorSize;
}> &
  BaseProps;

export function Anchor({ size = "medium", children, ...rest }: AnchorProps) {
  const isRouterContext = useInRouterContext();
  const LinkComponent = isRouterContext ? Link : "a";

  return (
    <LinkComponent
      className={clsx(styles.anchor, styles[`anchor--${size}`])}
      href={isRouterContext ? undefined : rest.to}
      to={isRouterContext ? rest.to : undefined!}
    >
      {children}
    </LinkComponent>
  );
}
