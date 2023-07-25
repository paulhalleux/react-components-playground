import clsx from "clsx";

import styles from "./Breadcrumb.module.scss";

type BreadcrumbProps = {
  items: (string | undefined)[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <ul className={styles.breadcrumb}>
      {items.filter(Boolean).map((item, index) => {
        return (
          <li
            key={item}
            className={clsx(styles.breadcrumb__item, {
              [styles.active]: index === items.length - 1,
            })}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
}
