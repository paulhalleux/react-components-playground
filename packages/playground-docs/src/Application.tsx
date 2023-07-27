import { RouterProvider } from "react-router";
import { useTheme } from "@paulhalleux/react-playground";

import { router } from "./pages";

export function Application() {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <RouterProvider router={router} />
    </div>
  );
}
