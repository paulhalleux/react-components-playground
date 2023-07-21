import { Link } from "react-router-dom";
import clsx from "clsx";

import { Component } from "../../../types/component";

import styles from "../MainLayout.module.scss";

type AutocompleteItemProps = {
  component: Component;
  className?: string;
};

export function AutocompleteItem({
  component,
  className,
}: AutocompleteItemProps) {
  return (
    <Link to={component.path} className={clsx(styles.search__item, className)}>
      <component.icon width={12} height={12} />
      {component.name}
    </Link>
  );
}
