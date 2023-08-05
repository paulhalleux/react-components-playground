import chalk from "chalk";

export const Messages = {
  Prefix: chalk.gray("[generate-props]"),
  FindingComponents: chalk.yellow("Finding components..."),
  FoundComponents: (count: number) =>
    chalk.green(
      `Found ${chalk.gray(count)} components using ${chalk.gray(
        "**/*.tsx",
      )} pattern`,
    ),
  ParsingComponents: chalk.yellow("Parsing components..."),
  WritingPropsFile: chalk.yellow("Writing props file..."),
  ParsedComponent: (name: string, current: number, total: number) =>
    chalk.green(
      `Parsed ${chalk.bold.whiteBright(name)} ${chalk.gray(
        `(${current}/${total})`,
      )}`,
    ),
  ParsedComponentFailed: (name: string, current: number, total: number) =>
    chalk.yellow(
      `No props found for ${chalk.bold.whiteBright(name)} ${chalk.gray(
        `(${current}/${total})`,
      )}`,
    ),
  Generated: chalk.green("Generated props file"),
};

export function log(message: string): void {
  console.log(`${Messages.Prefix} ${message}`);
}
