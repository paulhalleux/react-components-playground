import React, { useMemo } from "react";
import { useParams } from "react-router";

import { Documentation } from "../../../components/Documentation";
import { Routes } from "../../../constants/routes";
import { HookDocumentations } from "../../../utils/documentation";
import { getDocumentationPath } from "../../../utils/path";

export function HookPage() {
  const { hook } = useParams<{ hook: string }>();

  const { page, nextPage, previousPage } = useMemo(() => {
    if (!hook)
      return {
        page: undefined,
        nextPage: undefined,
        previousPage: undefined,
      };

    const filteredHooks = Object.values(HookDocumentations).filter(
      (value) => value.status !== "todo",
    );

    const pageIndex = filteredHooks.findIndex(
      (value) => getDocumentationPath(value) === hook,
    );

    const page = filteredHooks[pageIndex];
    const nextPage = filteredHooks[pageIndex + 1];
    const previousPage = filteredHooks[pageIndex - 1];

    return {
      page,
      nextPage,
      previousPage,
    };
  }, [hook]);

  return (
    <Documentation
      type="Hooks"
      page={page}
      nextPage={nextPage}
      previousPage={previousPage}
      getRoute={Routes.getHookRoute}
    />
  );
}
