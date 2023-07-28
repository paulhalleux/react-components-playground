import { createBrowserRouter } from "react-router-dom";

import { ComponentList } from "../../docs/__generated__/components";
import { Routes } from "../constants/routes";
import { MainLayout } from "../layouts";
import { PlaygroundLayout } from "../layouts/PlaygroundLayout";

import { ComponentPage } from "./ComponentPage";
import { MainPage } from "./MainPage";

export const ComponentsArray = Object.values(ComponentList);

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <PlaygroundLayout />,
        children: [
          { path: Routes.Home, element: <MainPage /> },
          {
            path: "/components/:component",
            element: <ComponentPage />,
          },
        ],
      },
    ],
  },
]);
