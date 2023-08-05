import chalk from "chalk";

export const LogMessages = {
  Discovering: () =>
    `${chalk.gray("[1/4]")} ${chalk.green("Discovering docs files...")}`,
  Generating: (files: number) =>
    `${chalk.gray("[2/4]")} ${chalk.green("Generating docs...")} ${chalk.gray(
      `(${files} files)`,
    )}`,
  Generated: (componentName: string) =>
    `${chalk.gray("[3/4]")} ${chalk.green("Generated")} ${chalk.gray(
      "->",
    )} ${chalk.blue(`${componentName}.jsx`)}`,
  IndexGenerated: () =>
    `${chalk.gray("[4/4]")} ${chalk.green("Generated")} ${chalk.gray(
      "index.js",
    )}`,
  GeneratingProps: `${chalk.gray("[1/2]")} ${chalk.green(
    "Generating props...",
  )}`,
  GeneratedProps: (componentName: string, index: number, total: number) =>
    `${chalk.gray("[1/2]")} ${chalk.green("Generated props for")} ${chalk.gray(
      "->",
    )} ${chalk.blue(componentName)} ${chalk.gray(`(${index}/${total})`)}`,
  PropsGenerated: () =>
    `${chalk.gray("[2/2]")} ${chalk.green("Generated")} ${chalk.gray(
      "props.json",
    )}`,
  NoProps: (file: string) =>
    `${chalk.gray("[1/2]")} ${chalk.yellow("No props found for")} ${chalk.gray(
      "->",
    )} ${chalk.blue(file)}`,
};
