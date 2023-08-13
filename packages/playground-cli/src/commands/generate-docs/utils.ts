import { compile } from "@mdx-js/mdx";
import fs, { readFile } from "fs/promises";
import { glob } from "glob";
import startCase from "lodash/startCase";
import * as path from "path";
import { TitlePlugin } from "./title-plugin";
import { DocumentationData, DocumentationMeta, ParsingError } from "./types";

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
export async function processDocumentationFile(
  file: string,
  root: string,
): Promise<DocumentationData> {
  const mdxContent = await getMDXContent(path.join(root, file));
  const defaultTitle = file.replace(/\.mdx$/, "");
  const jsxCode = await getJSXCode(mdxContent);
  const metadata = getMetadata(mdxContent);

  if (!metadata.type) {
    throw new ParsingError("'type' missing in metadata", "metadata");
  }

  return {
    id: getDocumentationId(defaultTitle),
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
 * Get the documentation ID from the file path
 * @param filePath Path to the documentation file
 * @returns Documentation ID
 */
function getDocumentationId(filePath: string): string {
  return startCase(filePath.replace(/\.mdx$/, "")).replace(/\s/g, "");
}

/**
 * Parse the metadata of a documentation file
 * @param mdx MDX content
 * @returns Metadata
 */
function getMetadata(mdx: string): DocumentationMeta {
  if (!mdx.startsWith("---") || mdx.split("---").length < 3)
    throw new ParsingError("Metadata not found", "metadata");

  const metadata = mdx.split("---")[1];
  return metadata
    .split("\n")
    .filter((line) => line.trim().match(/^[a-zA-Z0-9]+:/))
    .reduce((acc, line) => {
      const indexOfKey = line.indexOf(":");
      const key = line.slice(0, indexOfKey);
      const value = line.slice(indexOfKey + 1);
      acc[key.trim() as keyof DocumentationMeta] = value.trim();
      return acc;
    }, {} as DocumentationMeta);
}

/**
 * Get the index file content
 * @param documentations List of documentations
 * @returns Index file content
 */
export function getIndexFile(
  documentations: Map<string, DocumentationData>,
): string {
  const indexParts: string[] = [];

  documentations.forEach((componentData) => {
    const importStatement = `import ${
      componentData.id
    } from "./documentation/${componentData.filePath.replace(/\\/g, "/")}";`;
    indexParts.push(importStatement);
  });

  indexParts.push(
    `\nexport const Components = {`,
    Array.from(documentations.entries())
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
        .replace(/[\\\/]/g, "");
      const filename = file.replace(/[\\]/g, "/").replace(/\.[jt]sx?$/, "");

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
 * Get the registry file content
 * @param documentations List of documentations
 * @returns Components file content
 */
export function getRegistryFile(
  documentations: Map<string, DocumentationData>,
) {
  return [
    "import { DocumentationPage } from '../../src/types/documentation';",
    `export const Registry: Record<string, DocumentationPage<any>> = {`,
    ...Array.from(documentations.entries()).map(
      ([, componentData]) =>
        `  ${componentData.id}: ${JSON.stringify({
          id: componentData.id,
          ...componentData.meta,
        })},`,
    ),
    `}`,
  ].join("\n");
}
