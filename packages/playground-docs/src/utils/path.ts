import kebab from "lodash/kebabCase";

import { ComponentMeta } from "../../docs/__generated__/components";

export function getComponentPath(component: ComponentMeta) {
  const name = component.path || kebab(component.title);
  return `/${kebab(component.category)}/${name}`;
}
