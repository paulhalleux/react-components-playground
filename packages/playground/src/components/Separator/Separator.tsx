import clsx from "clsx";

import styles from "./Separator.module.scss";

export type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
};

export function Separator({ orientation = "horizontal" }: SeparatorProps) {
  return (
    <div
      className={clsx(styles.separator, styles[`separator--${orientation}`])}
    />
  );
}
