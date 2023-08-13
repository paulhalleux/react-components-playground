import { Outlet } from "react-router";

import { Routes } from "../../constants/routes";
import { DocumentationLayout } from "../../layouts/DocumentationLayout";
import { HookDocumentations } from "../../utils/documentation";

import { HookPage } from "./HookPage";

export function HooksPage() {
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

  return (
    <DocumentationLayout sidebarItems={sidebarItems}>
      <Outlet />
    </DocumentationLayout>
  );
}

HooksPage.Hook = HookPage;
