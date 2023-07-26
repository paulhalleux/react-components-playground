import { Link } from "react-router-dom";
import clsx from "clsx";

import { Icons } from "../../../../../playground/dist/index.es";
import { ComponentMeta } from "../../../../docs/__generated__/components";
import { Routes } from "../../../constants/routes";

import styles from "../MainLayout.module.scss";

type AutocompleteItemProps = {
  component: ComponentMeta;
  className?: string;
};

export function AutocompleteItem({
  component,
  className,
}: AutocompleteItemProps) {
  const Icon = component.icon
    ? Icons[component.icon as keyof typeof Icons]
    : undefined;

  return (
    <Link
      to={Routes.Component(component)}
      className={clsx(styles.search__item, className)}
    >
      {Icon && <Icon width={12} height={12} />}
      {component.title}
    </Link>
  );
}
