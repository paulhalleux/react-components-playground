import { createBrowserRouter } from "react-router-dom";

import { ComponentList } from "../../docs/__generated__/components";
import { Routes } from "../constants/routes";
import { MainLayout } from "../layouts";
import { PlaygroundLayout } from "../layouts/PlaygroundLayout";

import { ComponentPage } from "./ComponentPage";
import { MainPage } from "./MainPage";

const ComponentsArray = Object.values(ComponentList);
const componentRoutes = ComponentsArray.map((component, index) => ({
  path: Routes.Component(component),
  element: (
    <ComponentPage
      key={component.title}
      component={component}
      previous={ComponentsArray[index - 1]}
      next={ComponentsArray[index + 1]}
    />
  ),
}));

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <PlaygroundLayout />,
        children: [
          { path: Routes.Home, element: <MainPage /> },
          ...componentRoutes,
        ],
      },
    ],
  },
]);
