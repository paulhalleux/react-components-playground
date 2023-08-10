import { RouterProvider } from "react-router";
import { ConfirmProvider } from "@paulhalleux/react-playground";

import { router } from "./pages";

export function Application() {
  return (
    <ConfirmProvider>
      <RouterProvider router={router} />
    </ConfirmProvider>
  );
}
