import React from "react";
import { Outlet } from "react-router";

import { Routes } from "../../constants/routes";
import { DocumentationLayout } from "../../layouts/DocumentationLayout";
import { groupComponents } from "../../utils/components";
import { ComponentDocumentations } from "../../utils/documentation";

import { ComponentPage } from "./ComponentPage";
import { MainPage } from "./MainPage";

export function ComponentsPage() {
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

  return (
    <DocumentationLayout sidebarItems={sidebarItems}>
      <Outlet />
    </DocumentationLayout>
  );
}

ComponentsPage.Main = MainPage;
ComponentsPage.Component = ComponentPage;
