import { RouterProvider } from "react-router";

import { useTheme } from "./contexts/theme-context";
import { router } from "./pages";

export function Application() {
  const { theme } = useTheme();
  return (
    <div className={theme}>
      <RouterProvider router={router} />
    </div>
  );
}
