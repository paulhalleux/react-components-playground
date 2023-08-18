import { Routes } from "../../constants/routes";
import { HookDocumentations } from "../../utils/documentation";

export function useHooksSidebar() {
  const sidebarItems = [
    {
      title: "Hooks",
      items: Object.values(HookDocumentations).map((hook) => ({
        title: hook.title,
        path: Routes.getHookRoute(hook),
        disabled: hook.status === "todo",
      })),
    },
  ];

  return { sidebarItems };
}
