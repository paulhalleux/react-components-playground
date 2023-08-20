import kebabCase from "lodash/kebabCase";

import { DocumentationPage } from "@/generated";

import { ComponentMeta } from "../types/documentation";

const GroupOrder = [
  "Resources",
  "Components",
  "Form",
  "Navigation",
  "Layout",
  "Dashboard",
];

export function groupComponents(
  components: Record<string, DocumentationPage<ComponentMeta>>,
) {
  const groups: Record<string, DocumentationPage<ComponentMeta>[]> = {};
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
        components: groups[group].sort((a, b) =>
          a.title.localeCompare(b.title),
        ),
      };
      return acc;
    },
    {} as Record<
      string,
      {
        title: string;
        components: DocumentationPage<ComponentMeta>[];
      }
    >,
  );
}
