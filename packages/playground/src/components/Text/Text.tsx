import { ElementType, PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Text.module.scss";

export type TextType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "text-xs"
  | "text-sm"
  | "text-md"
  | "text-lg"
  | "text-xl";

export type TextVariant =
  | "default"
  | "secondary"
  | "info"
  | "primary"
  | "success"
  | "warning"
  | "danger";

export type TextProps = PropsWithChildren<{
  /**
   * The element to render as
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  /**
   * The type of text to render
   */
  type?: TextType;
  /**
   * The variant of the text
   */
  variant?: TextVariant;
  /**
   * The weight of the text
   */
  weight?: "normal" | "bold" | "light" | number;
}> &
  BaseProps;

export function Text({
  as,
  type = "text-md",
  variant = "default",
  weight,
  children,
  className,
  style,
  ...rest
}: TextProps) {
  const Component = as || (type.startsWith("h") ? (type as ElementType) : "p");

  return (
    <Component
      className={clsx(
        styles.text,
        styles[`text--type-${type}`],
        styles[`text--variant-${variant}`],
        {
          [styles[`text--weight-${weight}`]]: typeof weight === "string",
        },
        className,
      )}
      style={{
        ...style,
        fontWeight: typeof weight === "number" ? weight : undefined,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
