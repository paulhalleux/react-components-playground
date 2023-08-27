import React from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { Anchor } from "../Anchor";
import { Button } from "../Button";
import { Icon, IconProps } from "../Icons";

import styles from "./EmptyState.module.scss";

export type EmptyStateAction =
  | { type: "button"; onClick: () => void; label: string }
  | { type: "link"; to: string; label: string };

export type EmptyStateVariant = "default" | "ghost";
export type EmptyStateProps = {
  /**
   * The icon of the empty state.
   */
  icon?: IconProps["name"];
  /**
   * The title of the empty state.
   */
  title: string;
  /**
   * The description of the empty state.
   */
  description: string;
  /**
   * The actions of the empty state.
   */
  actions?: EmptyStateAction[];
  /**
   * The variant of the empty state.
   */
  variant?: EmptyStateVariant;
} & BaseProps;

export function EmptyState({
  title,
  description,
  actions,
  icon,
  className,
  variant = "default",
  ...rest
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        styles["empty-state"],
        styles[`empty-state--${variant}`],
        className,
      )}
      {...rest}
    >
      {icon && (
        <div className={styles.icon}>
          <Icon name={icon} size={64} />
        </div>
      )}
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      {actions && (
        <div className={styles.actions}>
          {actions.map((action, index) =>
            action.type === "button" ? (
              <Button onClick={action.onClick} key={index}>
                {action.label}
              </Button>
            ) : (
              <Anchor to={action.to} key={index} underline size="medium" asLink>
                {action.label}
              </Anchor>
            ),
          )}
        </div>
      )}
    </div>
  );
}
