import { ComponentMeta } from "../../docs/__generated__/components";

export function groupComponents(components: Record<string, ComponentMeta>) {
  const groups: Record<string, ComponentMeta[]> = {};
  Object.values(components).forEach((component) => {
    const group = component.category ?? "Uncategorized";
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(component);
  });
  return groups;
}
