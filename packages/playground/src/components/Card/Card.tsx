import { ElementType, PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import { CardBody } from "./CardBody";
import { CardFooter } from "./CardFooter";
import { CardGroup } from "./CardGroup";
import { CardHeader } from "./CardHeader";
import { CardThumbnail } from "./CardThumbnail";

import styles from "./Card.module.scss";

export type CardVariant =
  | "default"
  | "secondary"
  | "primary"
  | "success"
  | "danger"
  | "warning";

export type CardOrientation = "horizontal" | "vertical";
export type CardPaddingSize = "sm" | "md" | "lg";
export type CardProps<AsProps> = PropsWithChildren<{
  /**
   * The component used for the root node.
   */
  as?: ElementType;
  /**
   * Defines the variant of the card.
   */
  variant?: CardVariant;
  /**
   * Adds a shadow to the card.
   */
  shadow?: boolean;
  /**
   * Defines the orientation of the card.
   */
  orientation?: CardOrientation;
  /**
   * Defines the padding size of the card.
   */
  paddingSize?: CardPaddingSize;
  /**
   * Defines the maximum height of the card.
   */
}> &
  BaseProps &
  AsProps;

export function Card<AsProps>({
  variant,
  children,
  className,
  shadow = false,
  orientation = "vertical",
  as: Component = "div",
  paddingSize,
  style,
  ...rest
}: CardProps<AsProps>) {
  return (
    <Component
      className={clsx(
        styles.card,
        styles[`card--${variant}`],
        styles[`card--${orientation}`],
        {
          [styles["card--shadow"]]: shadow,
        },
        className,
      )}
      style={{
        ...style,
        "--card-padding-size": paddingSize
          ? `var(--padding-${paddingSize})`
          : undefined,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}

Card.Thumbnail = CardThumbnail;
Card.Body = CardBody;
Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.Group = CardGroup;
