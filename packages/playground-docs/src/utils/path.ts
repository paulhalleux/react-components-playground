import kebab from "lodash/kebabCase";

export function getComponentPath(componentName: string) {
  return kebab(componentName);
}
