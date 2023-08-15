import chalk from "chalk";

export const Messages = {
  Prefix: chalk.gray("[generate-props] "),
  FindingComponents: chalk.yellow("Finding components..."),
  FoundComponents: (count: number, pattern: string) =>
    chalk.green(
      `Found ${chalk.gray(count)} components using ${chalk.gray(
        pattern,
      )} pattern`,
    ),
  ParsingComponents: chalk.yellow("Parsing components..."),
  WritingPropsFile: chalk.yellow("Writing props file..."),
  ParsedComponent: (name: string, index: number, total: number) =>
    chalk.green(
      `Parsed ${chalk.bold.whiteBright(name)} ${chalk.gray(
        `(${index}/${total})`,
      )}`,
    ),
  ParsedComponentFailed: (name: string) =>
    chalk.yellowBright(`No props found for ${chalk.bold.whiteBright(name)}`),
  Generated: chalk.green("Generated props file"),
};
