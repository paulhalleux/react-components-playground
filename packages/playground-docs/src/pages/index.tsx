import { createBrowserRouter } from "react-router-dom";

import { ComponentList } from "../../docs/__generated__/components";
import { MainLayout } from "../layouts";
import { PlaygroundLayout } from "../layouts/PlaygroundLayout";
import { getComponentPath } from "../utils/path";

import { ComponentPage } from "./ComponentPage";
import { MainPage } from "./MainPage";

const ComponentsArray = Object.values(ComponentList);
const componentRoutes = ComponentsArray.map((component, index) => ({
  path: `/components/${component.path || getComponentPath(component.title)}`,
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
        children: [{ path: "/", element: <MainPage /> }, ...componentRoutes],
      },
    ],
  },
]);
