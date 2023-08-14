import { CSSProperties, PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../../types";

import styles from "../Card.module.scss";

type CardThumbnailProps = PropsWithChildren<{
  /**
   * Defines the maximum height of the thumbnail.
   */
  maxHeight?: CSSProperties["maxHeight"];
  /**
   * Defines the maximum width of the thumbnail.
   */
  maxWidth?: CSSProperties["maxWidth"];
  /**
   * Adds a border to the thumbnail.
   */
  border?: boolean;
}> &
  BaseProps;

export function CardThumbnail({
  children,
  className,
  maxHeight,
  maxWidth,
  style,
  border,
  ...rest
}: CardThumbnailProps) {
  return (
    <div
      className={clsx(
        styles.card__thumbnail,
        {
          [styles["card__thumbnail--border"]]: border,
        },
        className,
      )}
      style={{
        ...style,
        maxHeight,
        maxWidth,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
