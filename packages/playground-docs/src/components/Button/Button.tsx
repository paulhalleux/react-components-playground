import { PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Button.module.scss";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  variant?: "default" | "ghost";
  icon?: boolean;
}>;

export function Button({
  children,
  onClick,
  variant = "default",
  icon,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(styles.button, styles[`button--${variant}`], {
        [styles["button--icon"]]: icon,
      })}
    >
      {children}
    </button>
  );
}
