import { mkdir, writeFile } from "fs/promises";
import { ArgumentsCamelCase } from "yargs";
import { BaseCommand } from "../../types";
import { log, Messages } from "./messages";
import { ComponentProp } from "./types";
import { getComponents, getParsedComponents } from "./utils";

type GeneratePropsCommandOptions = {
  path: string;
  output: string;
};

const handler = async (
  argv: ArgumentsCamelCase<GeneratePropsCommandOptions>,
): Promise<void> => {
  // Find all components
  log(Messages.FindingComponents);
  const componentList = await getComponents(argv.path);
  log(Messages.FoundComponents(componentList.length));

  const components = new Map<string, ComponentProp[]>();

  // Parsing components
  log(Messages.ParsingComponents);
  for (const component of componentList) {
    const parsed = await getParsedComponents(component, argv.path);

    if (!parsed || parsed.length === 0) {
      log(Messages.ParsedComponentFailed(component));
      continue;
    }

    for (const component of parsed) {
      components.set(component.displayName, component.props);
      log(Messages.ParsedComponent(component.displayName));
    }
  }

  // Write props.json file
  log(Messages.WritingPropsFile);
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
  log(Messages.Generated);
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
  handler,
};
