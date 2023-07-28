import { ComponentMeta } from "../../docs/__generated__/components";
import { getComponentPath } from "../utils/path";

export const Routes = {
  Home: "/",
  Component: (component: ComponentMeta) =>
    `/components/${getComponentPath(component)}`,
};
