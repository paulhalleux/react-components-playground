import { createBrowserRouter } from "react-router-dom";
import {
  PointerIcon,
  SelectionFrameIcon,
  SelectionIcon,
  TableIcon,
} from "@paulhalleux/react-playground";

import { MainLayout } from "../layouts";
import { PlaygroundLayout } from "../layouts/PlaygroundLayout";
import { Component } from "../types/component";

import { ComponentPage } from "./ComponentPage";
import { MainPage } from "./MainPage";

const components: Component[] = [
  {
    name: "KeyframePath",
    path: "/components/keyframe-path",
    description: "A component to display a path with keyframes",
    icon: PointerIcon,
  },
  {
    name: "FrameSelector",
    path: "/components/frame-selector",
    description: "A component to select a frame",
    icon: SelectionIcon,
  },
  {
    name: "Selector",
    path: "/components/selector",
    description: "A component to select a value",
    icon: SelectionFrameIcon,
  },
  {
    name: "Table",
    path: "/components/table",
    description: "A component to display a table",
    icon: TableIcon,
  },
].sort((a, b) => a.name.localeCompare(b.name));

const componentRoutes = components.map((component, index) => ({
  path: component.path,
  element: (
    <ComponentPage
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
