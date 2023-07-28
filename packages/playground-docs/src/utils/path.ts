import kebab from "lodash/kebabCase";

import { ComponentMeta } from "../../docs/__generated__/components";

export function getComponentPath(component: ComponentMeta) {
  return component.path || kebab(component.title);
}
