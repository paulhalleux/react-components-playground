import { BaseCommand, clearLog, logMessage } from "@paulhalleux/cli";
import { mkdir, writeFile } from "fs/promises";
import { ArgumentsCamelCase } from "yargs";
import { Messages } from "./messages";
import { ComponentProp } from "./types";
import { getComponents, getParsedComponents } from "./utils";

type GeneratePropsCommandOptions = {
  path: string;
  output: string;
  pattern: string;
  ignore?: string;
};

const handler = async (
  argv: ArgumentsCamelCase<GeneratePropsCommandOptions>,
): Promise<void> => {
  // Find all components
  logMessage(Messages.FindingComponents, { prefix: Messages.Prefix });
  const componentList = await getComponents(
    argv.path,
    argv.pattern,
    argv.ignore,
  );
  logMessage(Messages.FoundComponents(componentList.length, argv.pattern), {
    prefix: Messages.Prefix,
  });

  const components = new Map<string, ComponentProp[]>();

  // Parsing components
  logMessage(Messages.ParsingComponents, { prefix: Messages.Prefix });
  let index = 1;
  for (const component of componentList) {
    const parsed = await getParsedComponents(component, argv.path);

    if (!parsed || parsed.length === 0) {
      logMessage(Messages.ParsedComponentFailed(component), {
        prefix: Messages.Prefix,
      });
      continue;
    }

    for (const component of parsed) {
      components.set(component.displayName, component.props);
      logMessage(
        Messages.ParsedComponent(
          component.displayName,
          index,
          componentList.length,
        ),
        { prefix: Messages.Prefix, replace: true },
      );
    }
    index++;
  }
  clearLog();

  // Write props.json file
  logMessage(Messages.WritingPropsFile, { prefix: Messages.Prefix });
  await mkdir(`${argv.output}`, { recursive: true });
  await writeFile(
    `${argv.output}/props.json`,
    JSON.stringify(
      [...components.entries()].reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {},
      ),
    ),
    "utf8",
  );
  logMessage(Messages.Generated, { prefix: Messages.Prefix });
};

export const GeneratePropsCommand: BaseCommand<GeneratePropsCommandOptions> = {
  trigger: "generate-props",
  command: "generate-props <path> <output>",
  describe: "Generate props documentation for the components",
  positional: {
    path: {
      describe: "Path to the components directory",
      type: "string",
      demandOption: true,
    },
    output: {
      describe: "Path to the output directory",
      type: "string",
      demandOption: true,
    },
  },
  options: {
    pattern: {
      type: "string",
      alias: "p",
      describe: "Pattern to match the component files",
      default: "**/*.tsx",
    },
    ignore: {
      type: "string",
      alias: "i",
      describe: "Pattern to ignore the component files",
    },
  },
  handler,
};
