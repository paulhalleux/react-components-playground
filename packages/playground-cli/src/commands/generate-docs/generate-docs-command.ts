import { copy } from "fs-extra";
import { mkdir, writeFile } from "fs/promises";
import * as path from "path";
import { rimraf } from "rimraf";
import { ArgumentsCamelCase } from "yargs";
import { BaseCommand } from "../../types";
import { writeTemplate } from "../../utils/liquid";
import { clearLog, logMessage } from "../../utils/logging";
import { Messages } from "./messages";
import { DocumentationData } from "./types";
import {
  getDocumentationFiles,
  getDocumentationTypesList,
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

const templates = {
  types: require("raw-loader!./templates/types.liquid").default,
};

const handler = async (
  argv: ArgumentsCamelCase<GenerateDocsCommandOptions>,
): Promise<void> => {
  // Find all documentation files
  logMessage(Messages.FindingDocs, { prefix: Messages.Prefix });
  const documentationFiles = await getDocumentationFiles(argv.documentation);
  logMessage(Messages.FoundDocs(documentationFiles.length), {
    prefix: Messages.Prefix,
  });

  // Map of documentation data
  const documentations = new Map<string, DocumentationData>();

  // Process each documentation file
  logMessage(Messages.ProcessingDocs, { prefix: Messages.Prefix });
  for (const file of documentationFiles) {
    try {
      const documentationData = await processDocumentationFile(
        file,
        argv.documentation,
      );

      documentations.set(documentationData.id, documentationData);
      logMessage(Messages.ProcessedDocFile(documentationData.meta.title), {
        prefix: Messages.Prefix,
        replace: true,
      });
    } catch (error) {
      logMessage(Messages.ProcessingError(file, error as Error), {
        prefix: Messages.Prefix,
      });
    }
  }
  clearLog();
  logMessage(Messages.ProcessedDocs, { prefix: Messages.Prefix });

  // Write documentation files
  logMessage(Messages.WritingMdxFiles, { prefix: Messages.Prefix });
  await rimraf(`${argv.output}/documentation`);
  await mkdir(`${argv.output}/documentation`, { recursive: true });
  for (const documentationData of documentations.values()) {
    await mkdir(
      `${argv.output}/documentation/${documentationData.filePath
        .split(/[\/\\]/g)
        .slice(0, -1)
        .join("\\")
        .replace(/\\/g, "/")}`,
      { recursive: true },
    );
    await writeFile(
      `${argv.output}/documentation/${documentationData.filePath}.jsx`,
      `${documentationData.jsxCode}`,
    );
  }

  // Generate examples.ts file
  logMessage(Messages.WritingExamplesFile, { prefix: Messages.Prefix });

  await rimraf(`${argv.output}/examples`);
  await mkdir(`${argv.output}/examples`, { recursive: true });
  await copy(argv.examples, `${argv.output}/examples`);

  const examplesFile = await getExamplesFile(argv.examples);
  await writeFile(`${argv.output}/examples.ts`, examplesFile);

  // Generate additional files
  logMessage(Messages.WritingAdditionalFiles, { prefix: Messages.Prefix });
  await writeTemplate(
    templates.types,
    {
      types: getDocumentationTypesList(documentations),
    },
    {
      output: path.join(argv.output, "types.ts"),
      prettier: true,
    },
  );

  // Generate index.ts file
  logMessage(Messages.WritingIndexFile, { prefix: Messages.Prefix });
  const indexFile = getIndexFile(documentations);
  await writeFile(`${argv.output}/index.ts`, indexFile);

  // Generate registry.ts file
  logMessage(Messages.WritingRegistryFile, { prefix: Messages.Prefix });
  const registryFile = getRegistryFile(documentations);
  await writeFile(`${argv.output}/registry.ts`, registryFile);

  logMessage(Messages.Generated, { prefix: Messages.Prefix });
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
