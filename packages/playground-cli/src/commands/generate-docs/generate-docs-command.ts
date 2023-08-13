import { mkdir, writeFile } from "fs/promises";
import { ArgumentsCamelCase } from "yargs";
import { BaseCommand } from "../../types";
import { log, Messages } from "./messages";
import { DocumentationData } from "./types";
import {
  getDocumentationFiles,
  getExamplesFile,
  getIndexFile,
  getRegistryFile,
  processDocumentationFile,
} from "./utils";

type GenerateDocsCommandOptions = {
  documentation: string;
  examples: string;
  output: string;
};

const handler = async (
  argv: ArgumentsCamelCase<GenerateDocsCommandOptions>,
): Promise<void> => {
  // Find all documentation files
  log(Messages.FindingDocs);
  const documentationFiles = await getDocumentationFiles(argv.documentation);
  log(Messages.FoundDocs(documentationFiles.length));

  // Map of documentation data
  const documentations = new Map<string, DocumentationData>();

  // Process each documentation file
  log(Messages.ProcessingDocs);
  for (const file of documentationFiles) {
    try {
      const documentationData = await processDocumentationFile(
        file,
        argv.documentation,
      );

      documentations.set(documentationData.id, documentationData);
      log(Messages.ProcessedDocFile(documentationData.meta.title));
    } catch (error) {
      log(Messages.ProcessingError(file, error as Error));
    }
  }
  log(Messages.ProcessedDocs);

  // Write documentation files
  log(Messages.WritingMdxFiles);
  await mkdir(`${argv.output}/documentation`, { recursive: true });
  for (const documentationData of documentations.values()) {
    await mkdir(
      `${argv.output}/documentation/${documentationData.filePath
        .split(/[\/\\]/g)
        .slice(0, -1)
        .join("\\")}`,
      { recursive: true },
    );
    await writeFile(
      `${argv.output}/documentation/${documentationData.filePath}.jsx`,
      `${documentationData.jsxCode}`,
    );
  }

  // Generate examples.ts file
  log(Messages.WritingExamplesFile);
  const examplesFile = await getExamplesFile(argv.examples);
  await writeFile(`${argv.output}/examples.ts`, examplesFile);

  // Generate index.ts file
  log(Messages.WritingIndexFile);
  const indexFile = getIndexFile(documentations);
  await writeFile(`${argv.output}/index.ts`, indexFile);

  // Generate registry.ts file
  log(Messages.WritingRegistryFile);
  const registryFile = getRegistryFile(documentations);
  await writeFile(`${argv.output}/registry.ts`, registryFile);

  log(Messages.Generated);
};

export const GenerateDocsCommand: BaseCommand<GenerateDocsCommandOptions> = {
  trigger: "generate-docs",
  command: "generate-docs <documentation> <examples> <output>",
  describe: "Generate documentation from the markdown documentation files",
  positional: {
    documentation: {
      describe: "Documentation folder",
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
