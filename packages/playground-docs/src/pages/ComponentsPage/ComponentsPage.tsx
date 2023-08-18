import React from "react";
import { Outlet } from "react-router";

import { DocumentationLayout } from "../../layouts/DocumentationLayout";

import { ComponentPage } from "./ComponentPage";
import { MainPage } from "./MainPage";
import { useComponentsSidebar } from "./use-components-sidebar";

export function ComponentsPage() {
  const { sidebarItems } = useComponentsSidebar();

  return (
    <DocumentationLayout sidebarItems={sidebarItems}>
      <Outlet />
    </DocumentationLayout>
  );
}

ComponentsPage.Main = MainPage;
ComponentsPage.Component = ComponentPage;
