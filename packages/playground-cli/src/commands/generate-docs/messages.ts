import chalk from "chalk";

export const Messages = {
  Prefix: chalk.gray("[generate-docs]"),
  FindingComponents: chalk.yellow("Finding components..."),
  FoundComponents: (count: number) =>
    chalk.green(
      `Found ${chalk.gray(
        count,
      )} components description files using ${chalk.gray("**/*.mdx")} pattern`,
    ),
  ProcessingComponents: chalk.yellow("Processing components..."),
  ProcessedComponent: (id: string) =>
    chalk.green(`Processed component ${chalk.whiteBright(chalk.bold(id))}`),
  ProcessedComponents: chalk.green("Processed all components"),
  WritingDocumentationFiles: chalk.yellow("Writing documentation files..."),
  WritingExamplesFile: chalk.yellow("Writing examples file..."),
  WritingIndexFile: chalk.yellow("Writing index file..."),
  WritingComponentsFile: chalk.yellow("Writing components file..."),
  Generated: chalk.green("Generated documentation"),
};

export function log(message: string): void {
  console.log(`${Messages.Prefix} ${message}`);
}
