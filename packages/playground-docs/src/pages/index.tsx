import { createBrowserRouter } from "react-router-dom";

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
        ],
      },
    ],
  },
]);
