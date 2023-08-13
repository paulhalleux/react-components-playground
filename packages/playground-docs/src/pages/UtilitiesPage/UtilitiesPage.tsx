import { Outlet } from "react-router";

import { Routes } from "../../constants/routes";
import { DocumentationLayout } from "../../layouts/DocumentationLayout";
import { UtilityDocumentations } from "../../utils/documentation";

import { UtilityPage } from "./UtilityPage";

export function UtilitiesPage() {
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

  return (
    <DocumentationLayout sidebarItems={sidebarItems}>
      <Outlet />
    </DocumentationLayout>
  );
}

UtilitiesPage.Utility = UtilityPage;
