import React, { useMemo } from "react";
import { useParams } from "react-router";

import { Documentation } from "../../../components/Documentation";
import { Routes } from "../../../constants/routes";
import { UtilityDocumentations } from "../../../utils/documentation";
import { getDocumentationPath } from "../../../utils/path";
import { useUtilitiesSidebar } from "../use-utilities-sidebar";

export function UtilityPage() {
  const { utility } = useParams<{ utility: string }>();
  const { sidebarItems } = useUtilitiesSidebar();

  const { page, nextPage, previousPage } = useMemo(() => {
    if (!utility)
      return {
        page: undefined,
        nextPage: undefined,
        previousPage: undefined,
      };

    const filteredHooks = Object.values(UtilityDocumentations).filter(
      (value) => value.status !== "todo",
    );

    const pageIndex = filteredHooks.findIndex(
      (value) => getDocumentationPath(value) === utility,
    );

    const page = filteredHooks[pageIndex];
    const nextPage = filteredHooks[pageIndex + 1];
    const previousPage = filteredHooks[pageIndex - 1];

    return {
      page,
      nextPage,
      previousPage,
    };
  }, [utility]);

  return (
    <Documentation
      type="Utilities"
      page={page}
      nextPage={nextPage}
      previousPage={previousPage}
      getRoute={Routes.getUtilityRoute}
      sidebarItems={sidebarItems}
    />
  );
}
