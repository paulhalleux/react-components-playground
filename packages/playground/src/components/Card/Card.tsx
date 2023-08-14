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
  as?: ElementType;
  variant?: CardVariant;
  shadow?: boolean;
  orientation?: CardOrientation;
  paddingSize?: CardPaddingSize;
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
