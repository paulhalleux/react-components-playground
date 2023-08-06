import { compile } from "@mdx-js/mdx";
import fs, { readFile } from "fs/promises";
import { glob } from "glob";
import startCase from "lodash/startCase";
import * as path from "path";
import { TitlePlugin } from "./title-plugin";
import { ComponentData, ComponentMeta } from "./types";

/**
 * Get all documentation files in a directory
 * @param path Path to the directory
 * @returns List of documentation files
 */
export async function getDocumentationFiles(path: string): Promise<string[]> {
  return await glob("**/*.mdx", {
    cwd: path,
  });
}

/**
 * Process a component file
 * @param file Path to the component file
 * @param root Root path of the component
 * @returns Component data
 */
export async function processComponent(
  file: string,
  root: string,
): Promise<ComponentData> {
  const mdxContent = await getMDXContent(path.join(root, file));
  const defaultTitle = file.replace(/\.mdx$/, "");
  const jsxCode = await getJSXCode(mdxContent);

  return {
    id: getComponentId(defaultTitle),
    raw: mdxContent,
    meta: {
      title: defaultTitle.split(/[\/\\]/g).pop(),
      ...getMetadata(mdxContent),
    },
    filePath: defaultTitle,
    jsxCode: jsxCode,
  };
}

/**
 * Get the JSX code from an MDX file
 * @param mdx MDX content
 * @returns JSX code
 */
async function getJSXCode(mdx: string): Promise<string> {
  let metadataCleaned = mdx;
  if (mdx.startsWith("---")) {
    metadataCleaned = mdx.split("---").slice(2).join("---");
  }

  return (
    await compile(metadataCleaned, {
      // @ts-ignore
      Fragment: "React.Fragment",
      jsx: true,
      jsxs: true,
      remarkPlugins: [TitlePlugin],
    })
  ).toString();
}

/**
 * Get the content of an MDX file
 * @param file Path to the MDX file
 * @returns Content of the MDX file
 */
async function getMDXContent(file: string): Promise<string> {
  return await readFile(file, "utf8");
}

/**
 * Get the component ID from the file path
 * @param filePath Path to the component file
 * @returns Component ID
 */
function getComponentId(filePath: string): string {
  return startCase(filePath.replace(/\.mdx$/, "")).replace(/\s/g, "");
}

/**
 * Parse the metadata of a component
 * @param mdx MDX content
 * @returns Metadata
 */
function getMetadata(mdx: string): ComponentMeta {
  if (!mdx.startsWith("---") || mdx.split("---").length < 3) return {};
  const metadata = mdx.split("---")[1];
  return metadata
    .split("\n")
    .filter((line) => line.trim().match(/^[a-zA-Z0-9]+:/))
    .reduce((acc, line) => {
      const indexOfKey = line.indexOf(":");
      const key = line.slice(0, indexOfKey);
      const value = line.slice(indexOfKey + 1);
      acc[key.trim() as keyof ComponentMeta] = value.trim();
      return acc;
    }, {} as ComponentMeta);
}

/**
 * Get the index file content
 * @param components List of components
 * @returns Index file content
 */
export function getIndexFile(components: Map<string, ComponentData>): string {
  const indexParts: string[] = [];

  components.forEach((componentData) => {
    const importStatement = `import ${
      componentData.id
    } from "./documentation/${componentData.filePath.replace("\\", "/")}";`;
    indexParts.push(importStatement);
  });

  indexParts.push(
    `\nexport const Components = {`,
    Array.from(components.entries())
      .map(([_, componentData]) => `  ${componentData.id},`)
      .join("\n"),
    `}`,
    `\nexport * from "./examples";`,
  );

  return indexParts.join("\n");
}

/**
 * Get the examples file content
 * @param examplesPath Path to the examples directory
 * @returns Examples file content
 */
export async function getExamplesFile(examplesPath: string) {
  const files = await glob("**/*.example.{js,jsx,ts,tsx}", {
    cwd: examplesPath,
  });

  const exports: string[] = [];
  const sources: string[] = [];

  const examples = await Promise.all(
    files.map(async (file) => {
      const name = file
        .replace(/\.example\.[jt]sx?$/, "")
        .replace(/[\\\/]/, "");
      const filename = file.replace(/[\\]/, "/").replace(/\.[jt]sx?$/, "");

      const source = await fs.readFile(`${examplesPath}/${file}`, "utf-8");

      sources.push(`${name}: \`${source.replace(/`/g, "\\`")}\`,`);
      exports.push(name);

      return `import * as ${name} from "../examples/${filename}";`;
    }),
  );

  const exportedObject = `export const Examples = {\n${exports
    .map((name) => `\t${name},`)
    .join("\n")}\n};`;

  const exportedSources = `export const ExamplesSources = {\n${sources
    .map((source) => `\t${source}`)
    .join("\n")}\n};`;

  return `${examples.join("\n")}\n\n${exportedObject}\n\n${exportedSources}`;
}

/**
 * Get the components file content
 * @param components List of components
 * @returns Components file content
 */
export function getComponentsFile(components: Map<string, ComponentData>) {
  return [
    `export type ComponentMeta = Partial<{\n\tsourceUrl: string;\n\tdescription: string;\n\tpath: string;\n\tcategory: string;\n\tstatus: string;\n\ticon: string;\n}> & { title: string; id: string; };`,
    `export const ComponentList: Record<string, ComponentMeta> = {`,
    ...Array.from(components.entries()).map(
      ([_, componentData]) =>
        `  ${componentData.id}: ${JSON.stringify({
          id: componentData.id,
          ...componentData.meta,
        })},`,
    ),
    `}`,
  ].join("\n");
}
