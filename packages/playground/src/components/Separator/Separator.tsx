import clsx from "clsx";

import styles from "./Separator.module.scss";

export type SeparatorOrientation = "horizontal" | "vertical";
export type SeparatorProps = {
  orientation?: SeparatorOrientation;
};

export function Separator({ orientation = "horizontal" }: SeparatorProps) {
  return (
    <div
      className={clsx(styles.separator, styles[`separator--${orientation}`])}
    />
  );
}
