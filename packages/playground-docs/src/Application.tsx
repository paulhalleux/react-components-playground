import { RouterProvider } from "react-router";

import { router } from "./pages";

export function Application() {
  return <RouterProvider router={router} />;
}
