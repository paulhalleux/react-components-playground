import { Outlet } from "react-router";

import { DocumentationLayout } from "../../layouts/DocumentationLayout";

import { HookPage } from "./HookPage";
import { useHooksSidebar } from "./use-hooks-sidebar";

export function HooksPage() {
  const { sidebarItems } = useHooksSidebar();

  return (
    <DocumentationLayout sidebarItems={sidebarItems}>
      <Outlet />
    </DocumentationLayout>
  );
}

HooksPage.Hook = HookPage;
