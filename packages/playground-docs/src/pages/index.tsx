import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { CleanIcon, EmptyState } from "@paulhalleux/react-playground";

import { ComponentList } from "../../docs/__generated__/components";
import { Routes } from "../constants/routes";
import { MainLayout } from "../layouts";
import { PlaygroundLayout } from "../layouts/PlaygroundLayout";
import { groupComponents } from "../utils/components";

import { ComponentPage } from "./ComponentPage";
import { MainPage } from "./MainPage";

export const GroupedComponents = groupComponents(ComponentList);
export const FlatComponents = Object.values(GroupedComponents).flatMap(
  (group) => group.components,
);

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <PlaygroundLayout />,
        children: [
          { path: Routes.Home, element: <MainPage /> },
          {
            path: `/:group/:component`,
            element: <ComponentPage />,
          },
          {
            path: "*",
            element: (
              <EmptyState
                variant="ghost"
                icon={CleanIcon}
                title="Page not found"
                description="The page you are looking for does not exist."
                actions={[{ type: "link", label: "Go back home", to: "/" }]}
              />
            ),
          },
        ],
      },
    ],
  },
]);
