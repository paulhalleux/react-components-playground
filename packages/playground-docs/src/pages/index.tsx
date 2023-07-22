import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "../layouts";
import { PlaygroundLayout } from "../layouts/PlaygroundLayout";

import { ComponentPage } from "./ComponentPage";
import { components } from "./components";
import { MainPage } from "./MainPage";

const componentRoutes = components.map((component, index) => ({
  path: component.path,
  element: (
    <ComponentPage
      key={component.name}
      component={component}
      previous={components[index - 1]}
      next={components[index + 1]}
    />
  ),
}));

export const router = createBrowserRouter([
  {
    element: <MainLayout components={components} />,
    children: [
      {
        element: <PlaygroundLayout components={components} />,
        children: [
          { path: "/", element: <MainPage components={components} /> },
          ...componentRoutes,
        ],
      },
    ],
  },
]);
