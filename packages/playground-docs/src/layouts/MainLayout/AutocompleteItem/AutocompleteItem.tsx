import { Link } from "react-router-dom";
import { Icons } from "@paulhalleux/react-playground";

import { ComponentMeta } from "../../../../docs/__generated__/components";
import { Routes } from "../../../constants/routes";

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
    <Link to={Routes.Component(component)} className={className}>
      {Icon && <Icon width={12} height={12} />}
      {component.title}
    </Link>
  );
}
