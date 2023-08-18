import React, { useMemo } from "react";
import { useParams } from "react-router";

import { Documentation } from "../../../components/Documentation";
import { Routes } from "../../../constants/routes";
import { groupComponents } from "../../../utils/components";
import { ComponentDocumentations } from "../../../utils/documentation";
import { getDocumentationPath } from "../../../utils/path";
import { useComponentsSidebar } from "../use-components-sidebar";

export function ComponentPage() {
  const { component } = useParams<{ component: string }>();
  const { sidebarItems } = useComponentsSidebar();

  const { page, nextPage, previousPage } = useMemo(() => {
    if (!component)
      return {
        page: undefined,
        nextPage: undefined,
        previousPage: undefined,
      };

    const FilteredComponents = Object.values(
      groupComponents(ComponentDocumentations),
    )
      .flatMap((value) => value.components)
      .filter((value) => value.status !== "todo");

    const componentDefinitionIndex = FilteredComponents.findIndex(
      (value) => getDocumentationPath(value) === component,
    );

    const page = FilteredComponents[componentDefinitionIndex];
    const nextPage = FilteredComponents[componentDefinitionIndex + 1];
    const previousPage = FilteredComponents[componentDefinitionIndex - 1];

    return {
      page,
      nextPage,
      previousPage,
    };
  }, [component]);

  return (
    <Documentation
      type="Components"
      page={page}
      nextPage={nextPage}
      previousPage={previousPage}
      getRoute={Routes.getComponentRoute}
      sidebarItems={sidebarItems}
    />
  );
}
