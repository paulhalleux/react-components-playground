import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [activeItem, setActiveItem] = useState<string>();
  const onItemClicked = (item: ContentTableItem) => {
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveItem(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  return (
    <div className={styles.content__table}>
      <h1 className={styles.title}>Table of Contents</h1>
      <ul className={styles.list}>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => onItemClicked(item)}
            className={clsx(
              styles.list__item,
              styles[`list__item--level-${item.level}`],
              { [styles.active]: activeItem === item.id },
            )}
          >
            <Link to={`#${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
