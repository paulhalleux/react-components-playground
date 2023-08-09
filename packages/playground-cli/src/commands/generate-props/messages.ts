import chalk from "chalk";

export const Messages = {
  Prefix: chalk.gray("[generate-props]"),
  FindingComponents: chalk.yellow("Finding components..."),
  FoundComponents: (count: number, pattern: string) =>
    chalk.green(
      `Found ${chalk.gray(count)} components using ${chalk.gray(
        pattern,
      )} pattern`,
    ),
  ParsingComponents: chalk.yellow("Parsing components..."),
  WritingPropsFile: chalk.yellow("Writing props file..."),
  ParsedComponent: (name: string) =>
    chalk.green(`Parsed ${chalk.bold.whiteBright(name)}`),
  ParsedComponentFailed: (name: string) =>
    chalk.yellow(`No props found for ${chalk.bold.whiteBright(name)}`),
  Generated: chalk.green("Generated props file"),
};

export function log(message: string): void {
  console.log(`${Messages.Prefix} ${message}`);
}
