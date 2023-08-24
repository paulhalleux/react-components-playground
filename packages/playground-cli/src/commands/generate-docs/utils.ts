import { FileUtils, Transpile } from "@paulhalleux/cli";
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
  return await FileUtils.readGlob("**/*.mdx", {
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
  const transpiledMdx = await Transpile.mdx<DocumentationMeta>(
    path.join(root, file),
    {
      metadataDelimiter: "---",
      parseMetadata: true,
      plugins: [TitlePlugin],
    },
  );

  const defaultTitle = FileUtils.withoutExtension(file);
  if (!transpiledMdx.metadata.type) {
    throw new ParsingError("'type' missing in metadata", "metadata");
  }

  return {
    id: getDocumentationId(defaultTitle),
    meta: {
      title: defaultTitle.split(/[\/\\]/g).pop(),
      ...transpiledMdx.metadata,
    },
    filePath: defaultTitle,
    jsxCode: transpiledMdx.code,
  };
}

/**
 * Get the documentation ID from the file path
 * @param filePath Path to the documentation file
 * @returns Documentation ID
 */
function getDocumentationId(filePath: string): string {
  return startCase(FileUtils.withoutExtension(filePath)).replace(/\s/g, "");
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
    `}\n`,
    `export * from "./examples";\n`,
    `export * from "./types";`,
  );

  return indexParts.join("\n");
}

/**
 * Get the examples file content
 * @param examplesPath Path to the examples directory
 * @returns Examples file content
 */
export async function getExamplesFile(examplesPath: string) {
  const files = await FileUtils.readGlob("**/*.example.{js,jsx,ts,tsx}", {
    cwd: examplesPath,
  });

  const exports: [string, string][] = [];
  const sources: string[] = [];

  const examples = await Promise.all(
    files.map(async (file) => {
      const source = await FileUtils.read(path.join(examplesPath, file));
      const filename = file.replace(/[\\]/g, "/").replace(/\.[jt]sx?$/, "");
      const name = file
        .replace(/\.example\.[jt]sx?$/, "")
        .replace(/[\\\/]/g, "");

      const id = filename.replace(".example", "");
      sources.push(`'${id}': \`${source.replace(/`/g, "\\`")}\`,`);
      exports.push([name, id]);

      return `import * as ${name} from "./examples/${filename}";`;
    }),
  );

  const exportedObject = `export const Examples = {\n${exports
    .map(([name, id]) => `\t'${id}': ${name},`)
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
    "import { DocumentationPage } from './types';",
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

/**
 * Get the list of documentation types
 * @param documentations List of documentations
 * @returns List of documentation types
 */
export function getDocumentationTypesList(
  documentations: Map<string, DocumentationData>,
) {
  return Array.from(documentations.values())
    .map((componentData) => componentData.meta.type)
    .filter((type, index, self) => self.indexOf(type) === index);
}
