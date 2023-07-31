import kebabCase from "lodash/kebabCase";

import { ComponentMeta } from "../../docs/__generated__/components";

const GroupOrder = ["Resources", "Components", "Form", "Experimental"];

export function groupComponents(components: Record<string, ComponentMeta>) {
  const groups: Record<string, ComponentMeta[]> = {};
  Object.values(components).forEach((component) => {
    const group = component.category ?? "Uncategorized";
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(component);
  });

  const sortedGroups = Object.keys(groups).sort((a, b) => {
    const aIndex = GroupOrder.indexOf(a);
    const bIndex = GroupOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) {
      return a.localeCompare(b);
    }
    if (aIndex === -1) {
      return 1;
    }
    if (bIndex === -1) {
      return -1;
    }
    return aIndex - bIndex;
  });

  return sortedGroups.reduce(
    (acc, group) => {
      acc[kebabCase(group)] = {
        title: group,
        components: groups[group],
      };
      return acc;
    },
    {} as Record<
      string,
      {
        title: string;
        components: ComponentMeta[];
      }
    >,
  );
}
