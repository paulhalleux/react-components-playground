import { Outlet } from "react-router";

import { DocumentationLayout } from "../../layouts/DocumentationLayout";

import { useUtilitiesSidebar } from "./use-utilities-sidebar";
import { UtilityPage } from "./UtilityPage";

export function UtilitiesPage() {
  const { sidebarItems } = useUtilitiesSidebar();

  return (
    <DocumentationLayout sidebarItems={sidebarItems}>
      <Outlet />
    </DocumentationLayout>
  );
}

UtilitiesPage.Utility = UtilityPage;
