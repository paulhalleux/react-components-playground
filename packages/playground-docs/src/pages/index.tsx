import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "../layouts";
import { PlaygroundLayout } from "../layouts/PlaygroundLayout";

import { Component } from "./Component";

const components = [
  { name: "KeyframePath", path: "/component/keyframe-path" },
  { name: "FrameSelector", path: "/component/frame-selector" },
  { name: "Selector", path: "/component/selector" },
];

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <PlaygroundLayout components={components} />,
        children: components.map((component, index) => ({
          path: component.path,
          element: (
            <Component
              component={component}
              previous={components[index - 1]}
              next={components[index + 1]}
            />
          ),
        })),
      },
    ],
  },
]);
