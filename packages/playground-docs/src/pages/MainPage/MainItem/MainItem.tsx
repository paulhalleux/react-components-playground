import { Link } from "react-router-dom";

import { Component } from "../../../types/component";

import styles from "../MainPage.module.scss";

type MainItemProps = {
  component: Component;
};

export function MainItem({ component }: MainItemProps) {
  return (
    <Link
      className={styles.main__grid_item}
      to={component.path}
      title={`${component.name}\n${component.description}`}
    >
      <header className={styles.main__grid_item__header}>
        <component.icon width={24} height={24} />
      </header>
      <div className={styles.main__grid_item__content}>
        <h2 className={styles.item__title}>{component.name}</h2>
        <p className={styles.item__description}>{component.description}</p>
      </div>
    </Link>
  );
}
