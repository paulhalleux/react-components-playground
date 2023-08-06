import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Anchor.module.scss";

export type AnchorSize = "inherit" | "small" | "medium" | "large";
export type AnchorVariant = "default" | "secondary";
export type AnchorProps = PropsWithChildren<{
  /**
   * The URL to link to when the anchor is clicked.
   */
  to: string;
  /**
   * The size of the anchor.
   */
  size?: AnchorSize;
  /**
   * The target attribute specifies where to open the linked document.
   */
  target?: "_blank" | "_self" | "_parent" | "_top";
  /**
   * The variant of the anchor.
   */
  variant?: AnchorVariant;
  /**
   * Whether the anchor should be underlined.
   */
  underline?: boolean;
  /**
   * Whether the anchor should be rendered as a link.
   */
  asLink?: boolean;
}> &
  BaseProps;

export function Anchor({
  size = "inherit",
  className,
  variant = "default",
  underline = false,
  children,
  asLink = false,
  ...rest
}: AnchorProps) {
  const LinkComponent = asLink ? Link : "a";

  return (
    <LinkComponent
      className={clsx(
        styles.anchor,
        styles[`anchor--${size}`],
        styles[`anchor--${variant}`],
        underline && styles["anchor--underline"],
        className,
      )}
      {...rest}
      href={asLink ? undefined : rest.to}
      to={asLink ? rest.to : undefined!}
    >
      {children}
    </LinkComponent>
  );
}
