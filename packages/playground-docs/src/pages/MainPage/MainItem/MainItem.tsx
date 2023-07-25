import { Link } from "react-router-dom";
import { Icons } from "@paulhalleux/react-playground";

import { ComponentMeta } from "../../../../docs/__generated__/components";
import { getComponentPath } from "../../../utils/path";

import styles from "../MainPage.module.scss";

type MainItemProps = {
  component: ComponentMeta;
};

export function MainItem({ component }: MainItemProps) {
  const Icon = component.icon
    ? Icons[component.icon as keyof typeof Icons]
    : undefined;

  return (
    <Link
      className={styles.main__grid_item}
      to={`/components/${component.path || getComponentPath(component.title)}`}
      title={`${component.title}\n${component.description}`}
    >
      <header className={styles.main__grid_item__header}>
        {Icon && <Icon width={24} height={24} />}
      </header>
      <div className={styles.main__grid_item__content}>
        <h2 className={styles.item__title}>{component.title}</h2>
        <p className={styles.item__description}>{component.description}</p>
      </div>
    </Link>
  );
}
