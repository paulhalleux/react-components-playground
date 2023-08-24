import {
  BaseCommand,
  clearLog,
  FileUtils,
  logMessage,
  TemplateUtils,
} from "@paulhalleux/cli";
import * as path from "path";
import { ArgumentsCamelCase } from "yargs";
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

  // Remove existing documentation folder and create a new one
  await FileUtils.remove(path.join(argv.output, "documentation"));
  await FileUtils.mkdir(path.join(argv.output, "documentation"));

  for (const documentationData of documentations.values()) {
    // Create directory
    await FileUtils.mkdir(
      path.join(
        argv.output,
        "documentation",
        documentationData.filePath
          .split(/[\/\\]/g)
          .slice(0, -1)
          .join("\\")
          .replace(/\\/g, "/"),
      ),
    );

    // Write MDX source code
    await FileUtils.write(
      path.join(
        argv.output,
        "documentation",
        `${documentationData.filePath}.jsx`,
      ),
      documentationData.jsxCode,
    );
  }

  // Generate examples.ts file
  logMessage(Messages.WritingExamplesFile, { prefix: Messages.Prefix });

  await FileUtils.remove(path.join(argv.output, "examples"));
  await FileUtils.mkdir(path.join(argv.output, "examples"));
  await FileUtils.copy(argv.examples, path.join(argv.output, "examples"));

  const examplesFile = await getExamplesFile(argv.examples);
  await FileUtils.write(path.join(argv.output, "examples.ts"), examplesFile);

  // Generate additional files
  logMessage(Messages.WritingAdditionalFiles, { prefix: Messages.Prefix });
  await TemplateUtils.write(
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
  await FileUtils.write(path.join(argv.output, "index.ts"), indexFile);

  // Generate registry.ts file
  logMessage(Messages.WritingRegistryFile, { prefix: Messages.Prefix });
  const registryFile = getRegistryFile(documentations);
  await FileUtils.write(path.join(argv.output, "registry.ts"), registryFile);

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
