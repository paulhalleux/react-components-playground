import { glob } from "glob";
import * as path from "path";
import { parse } from "react-docgen-typescript";
import { ParsedComponent } from "./types";

/**
 * Find all components in a directory
 * @param path Path to the directory
 * @param pattern Pattern to match
 * @param ignore Pattern to ignore
 * @returns List of components
 */
export async function getComponents(
  path: string,
  pattern: string,
  ignore?: string,
): Promise<string[]> {
  return await glob(pattern, {
    cwd: path,
    ignore: ignore ? [ignore] : [],
  });
}

/**
 * Get parsed component
 * @param componentPath Path to the component
 * @param root Root path
 * @returns Parsed component
 */
export async function getParsedComponents(componentPath: string, root: string) {
  const parsed = parse(path.join(root, componentPath));

  if (parsed.length === 0) {
    return null;
  }

  const components: ParsedComponent[] = [];

  for (const component of parsed) {
    const componentName = component.displayName;
    const props = component.props || {};

    const componentProps = Object.keys(props).map((key) => {
      const prop = props[key];
      return {
        name: key,
        description: prop.description,
        type: prop.type.name,
        required: prop.required,
        defaultValue: prop.defaultValue?.value,
      };
    });

    components.push({
      displayName: componentName,
      props: componentProps,
    });
  }

  return components;
}
