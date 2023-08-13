import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Routes } from "../constants/routes";
import { MainLayout } from "../layouts";

import { ComponentsPage } from "./ComponentsPage";
import { HooksPage } from "./HooksPage";
import { MainPage } from "./MainPage";
import { NotFoundPage } from "./NotFoundPage";
import { UtilitiesPage } from "./UtilitiesPage";

const NotFoundRoute = {
  path: "*",
  element: <NotFoundPage />,
};

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: Routes.Root,
        element: <MainPage />,
      },
      {
        path: Routes.Components,
        element: <ComponentsPage />,
        children: [
          {
            path: "",
            element: <ComponentsPage.Main />,
          },
          {
            path: Routes.ComponentMask,
            element: <ComponentsPage.Component />,
          },
          NotFoundRoute,
        ],
      },
      {
        path: Routes.Hooks,
        element: <HooksPage />,
        children: [
          {
            path: Routes.HookMask,
            element: <HooksPage.Hook />,
          },
          NotFoundRoute,
        ],
      },
      {
        path: Routes.Utilities,
        element: <UtilitiesPage />,
        children: [
          {
            path: Routes.UtilityMask,
            element: <UtilitiesPage.Utility />,
          },
          NotFoundRoute,
        ],
      },
      NotFoundRoute,
    ],
  },
]);
