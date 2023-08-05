import { glob } from "glob";
import * as path from "path";
import { parse } from "react-docgen-typescript";

/**
 * Find all components in a directory
 * @param path Path to the directory
 * @returns List of components
 */
export async function getComponents(path: string): Promise<string[]> {
  return await glob("**/*.tsx", {
    cwd: path,
  });
}

/**
 * Get parsed component
 * @param componentPath Path to the component
 * @param root Root path
 * @returns Parsed component
 */
export async function getParsedComponent(componentPath: string, root: string) {
  const parsed = parse(path.join(root, componentPath));

  if (!parsed[0]) {
    return null;
  }

  const componentName = parsed[0].displayName;
  const props = parsed[0].props || {};

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

  return {
    displayName: componentName,
    props: componentProps,
  };
}
