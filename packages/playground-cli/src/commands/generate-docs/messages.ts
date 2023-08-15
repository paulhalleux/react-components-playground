import chalk from "chalk";

export const Messages = {
  Prefix: chalk.gray("[generate-docs] "),
  FindingDocs: chalk.yellow("Finding documentation files..."),
  FoundDocs: (count: number) =>
    chalk.green(
      `Found ${chalk.gray(count)} documentation files using ${chalk.gray(
        "**/*.mdx",
      )} pattern`,
    ),
  ProcessingDocs: chalk.yellow("Processing documentation files..."),
  ProcessedDocFile: (id: string) =>
    chalk.green(`Processed ${chalk.whiteBright(chalk.bold(id))}`),
  ProcessedDocs: chalk.green("Processed all documentation files"),
  WritingMdxFiles: chalk.yellow("Writing mdx components files..."),
  WritingExamplesFile: chalk.yellow("Writing examples file..."),
  WritingIndexFile: chalk.yellow("Writing index file..."),
  WritingRegistryFile: chalk.yellow("Writing registry file..."),
  Generated: chalk.green("Generated documentation"),
  ProcessingError: (file: string, error: Error) =>
    chalk.red(
      `Error processing ${chalk.whiteBright(chalk.bold(file))}: ${chalk.red(
        error.message,
      )}`,
    ),
  WritingAdditionalFiles: chalk.yellow("Writing additional files..."),
};
