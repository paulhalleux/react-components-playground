import chalk from "chalk";

export const Messages = {
  Prefix: chalk.gray("[generate-icons] "),
  Cleanup: chalk.yellow("Cleaning up the output directory..."),
  CleanupSuccess: chalk.green("Successfully cleaned up the output directory"),
  FindIcons: chalk.yellow("Finding all the SVG files..."),
  FindIconsSuccess: (count: number) =>
    chalk.green(`Found ${chalk.gray(count)} SVG files`),
  GenerateComponents: chalk.yellow("Generating components code..."),
  GenerateComponentSuccess: (name: string, index: number, total: number) =>
    chalk.green(
      `Successfully generated icon ${chalk.bold.whiteBright(name)} ${chalk.gray(
        `(${index}/${total})`,
      )}`,
    ),
  WriteIndex: chalk.yellow("Writing index file..."),
  WriteAdditionalFiles: chalk.yellow("Writing additional files..."),
  WriteIndexSuccess: chalk.green("Successfully generated index file"),
  ProcessingError: (file: string, error: Error) =>
    chalk.red(
      `Error processing ${chalk.whiteBright(chalk.bold(file))}: ${chalk.red(
        error.message,
      )}`,
    ),
};
