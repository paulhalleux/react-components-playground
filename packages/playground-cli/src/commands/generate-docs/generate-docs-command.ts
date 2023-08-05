import { mkdir, writeFile } from "fs/promises";
import { ArgumentsCamelCase } from "yargs";
import { BaseCommand } from "../../types";
import { log, Messages } from "./messages";
import { ComponentData } from "./types";
import {
  getComponentsFile,
  getDocumentationFiles,
  getExamplesFile,
  getIndexFile,
  processComponent,
} from "./utils";

type GenerateDocsCommandOptions = {
  components: string;
  examples: string;
  output: string;
};

const handler = async (
  argv: ArgumentsCamelCase<GenerateDocsCommandOptions>,
): Promise<void> => {
  // Find all components
  log(Messages.FindingComponents);
  const componentsFiles = await getDocumentationFiles(argv.components);
  log(Messages.FoundComponents(componentsFiles.length));

  // Map of components data
  const components = new Map<string, ComponentData>();

  // Process each component
  log(Messages.ProcessingComponents);
  for (const file of componentsFiles) {
    const componentData = await processComponent(file, argv.components);
    components.set(componentData.id, componentData);
    log(Messages.ProcessedComponent(componentData.meta.title));
  }
  log(Messages.ProcessedComponents);

  // Write documentation files
  log(Messages.WritingDocumentationFiles);
  await mkdir(`${argv.output}/documentation`, { recursive: true });
  for (const component of components.values()) {
    await mkdir(
      `${argv.output}/documentation/${component.filePath
        .split(/[\/\\]/g)
        .slice(0, -1)
        .join("\\")}`,
      { recursive: true },
    );
    await writeFile(
      `${argv.output}/documentation/${component.filePath}.jsx`,
      `${component.jsxCode}`,
    );
  }

  // Generate examples.ts file
  log(Messages.WritingExamplesFile);
  const examplesContent = await getExamplesFile(argv.examples);
  await writeFile(`${argv.output}/examples.ts`, examplesContent);

  // Generate index.ts file
  log(Messages.WritingIndexFile);
  const indexContent = getIndexFile(components);
  await writeFile(`${argv.output}/index.ts`, indexContent);

  // Generate components.ts file
  log(Messages.WritingComponentsFile);
  const componentsContent = getComponentsFile(components);
  await writeFile(`${argv.output}/components.ts`, componentsContent);

  log(Messages.Generated);
};

export const GenerateDocsCommand: BaseCommand<GenerateDocsCommandOptions> = {
  trigger: "generate-docs",
  command: "generate-docs <components> <examples> <output>",
  describe: "Generate documentation for the components",
  positional: {
    components: {
      describe: "Components folder",
      type: "string",
      demandOption: true,
    },
    examples: {
      describe: "Examples folder",
      type: "string",
      demandOption: true,
    },
    output: {
      describe: "Output folder",
      type: "string",
      demandOption: true,
    },
  },
  handler,
};
