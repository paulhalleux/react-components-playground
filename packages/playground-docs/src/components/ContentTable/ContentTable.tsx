import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@paulhalleux/react-playground";
import clsx from "clsx";

import styles from "./ContentTable.module.scss";

export type ContentTableItem = {
  name: string;
  id: string;
  level: number;
};

type ContentTableProps = {
  items?: ContentTableItem[];
};

export function ContentTable({ items = [] }: ContentTableProps) {
  const onItemClicked = (item: ContentTableItem) => {
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.content__table}>
      <h1 className={styles.title}>Table of Contents</h1>
      {items?.length > 0 ? (
        <ul className={styles.list}>
          {items.map((item) => (
            <li
              key={`${item.id}-${item.level}`}
              onClick={() => onItemClicked(item)}
              className={clsx(
                styles.list__item,
                styles[`list__item--level-${item.level}`],
              )}
            >
              <Link to={`#${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <small className={styles.empty}>
          No table of contents found in this page.
        </small>
      )}
    </div>
  );
}

ContentTable.Skeleton = function ContentTableSkeleton() {
  return (
    <Skeleton.Container>
      <Skeleton width="70%" height="20px" margin="0 0 16px 0" />
      <Skeleton width="100%" height="17px" margin="0 0 0 10px" />
      <Skeleton width="80%" height="17px" margin="0 0 0 20px" />
      <Skeleton width="80%" height="17px" margin="0 0 0 20px" />
      <Skeleton width="80%" height="17px" margin="0 0 0 10px" />
    </Skeleton.Container>
  );
};
