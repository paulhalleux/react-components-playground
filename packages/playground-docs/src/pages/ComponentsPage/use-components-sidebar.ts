import { Routes } from "../../constants/routes";
import { groupComponents } from "../../utils/components";
import { ComponentDocumentations } from "../../utils/documentation";

export function useComponentsSidebar() {
  const sidebarItems = Object.entries(
    groupComponents(ComponentDocumentations),
  ).map(([, group]) => ({
    title: group.title,
    items: group.components.map((component) => ({
      title: component.title,
      path: Routes.getComponentRoute(component),
      disabled: component.status === "todo",
    })),
  }));

  return { sidebarItems };
}
