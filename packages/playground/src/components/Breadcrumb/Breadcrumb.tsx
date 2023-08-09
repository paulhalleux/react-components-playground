import clsx from "clsx";

import { BaseProps } from "../../types";
import { Anchor } from "../Anchor";

import styles from "./Breadcrumb.module.scss";

export type BreadcrumbItem = { label: string; href?: string };
export type BreadcrumbSize = "small" | "medium" | "large";
export type BreadcrumbProps = {
  /**
   * List of items to display in the breadcrumb
   */
  items: BreadcrumbItem[];
  /**
   * Size of the breadcrumb
   */
  size?: BreadcrumbSize;
} & BaseProps;

export function Breadcrumb({
  items,
  className,
  dataTestId,
  size = "medium",
  ...rest
}: BreadcrumbProps) {
  return (
    <ul
      className={clsx(
        styles.breadcrumb,
        styles[`breadcrumb--${size}`],
        className,
      )}
      {...rest}
      data-test-id={dataTestId}
    >
      {items.map((item, index) => {
        return (
          <li
            key={`breadcrumb-item-${item.label}-${item.href}`}
            data-test-id={`breadcrumb-item-${item}`}
            className={clsx(styles.breadcrumb__item, {
              [styles.active]: index === items.length - 1,
            })}
          >
            {item.href ? (
              <Anchor size={size} to={item.href} asLink>
                {item.label}
              </Anchor>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
