import { Link } from "react-router-dom";
import { Icons } from "@paulhalleux/react-playground";

import { DocumentationPage } from "@/generated";

import { Routes } from "../../../../constants/routes";
import { ComponentMeta } from "../../../../types/documentation";

import styles from "../MainPage.module.scss";

type MainItemProps = {
  component: DocumentationPage<ComponentMeta>;
};

export function MainItem({ component }: MainItemProps) {
  const Icon = component.icon
    ? Icons[component.icon as keyof typeof Icons]
    : undefined;

  return (
    <Link
      className={styles.main__grid_item}
      to={Routes.getComponentRoute(component)}
      title={`${component.title}\n${component.description}`}
    >
      <header className={styles.main__grid_item__header}>
        {Icon && <Icon size={24} />}
      </header>
      <div className={styles.main__grid_item__content}>
        <h2 className={styles.item__title}>{component.title}</h2>
        <p className={styles.item__description}>{component.description}</p>
      </div>
    </Link>
  );
}
