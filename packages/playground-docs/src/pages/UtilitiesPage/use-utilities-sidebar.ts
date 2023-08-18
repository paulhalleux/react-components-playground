import { Routes } from "../../constants/routes";
import { UtilityDocumentations } from "../../utils/documentation";

export function useUtilitiesSidebar() {
  const sidebarItems = [
    {
      title: "Utilities",
      items: Object.values(UtilityDocumentations).map((utility) => ({
        title: utility.title,
        path: Routes.getUtilityRoute(utility),
        disabled: utility.status === "todo",
      })),
    },
  ];

  return { sidebarItems };
}
