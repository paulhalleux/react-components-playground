import {
  BaseCommand,
  clearLog,
  logMessage,
  writeTemplate,
} from "@paulhalleux/cli";
import * as fs from "fs/promises";
import { glob } from "glob";
import * as path from "path";
import { rimraf } from "rimraf";
import { ArgumentsCamelCase } from "yargs";
import { Messages } from "./messages";
import {
  getIconContent,
  getIconName,
  getSvgContent,
  getSvgProps,
} from "./utils";

const templates = {
  icon: require("raw-loader!./templates/icon.liquid").default,
  types: require("raw-loader!./templates/types.liquid").default,
};

type GeneratePropsCommandOptions = {
  icons: string;
  output: string;
  defaultIconSize: number;
};

const handler = async (
  argv: ArgumentsCamelCase<GeneratePropsCommandOptions>,
): Promise<void> => {
  // Clean up the output directory
  logMessage(Messages.Cleanup, { prefix: Messages.Prefix });
  await rimraf(argv.output);
  await fs.mkdir(argv.output, { recursive: true });
  logMessage(Messages.CleanupSuccess, { prefix: Messages.Prefix });

  // Find all the SVG files in the icons directory
  logMessage(Messages.FindIcons, { prefix: Messages.Prefix });
  const icons = await glob("**/*.svg", {
    cwd: argv.icons,
  });
  logMessage(Messages.FindIconsSuccess(icons.length), {
    prefix: Messages.Prefix,
  });

  // Generate the components
  logMessage(Messages.GenerateComponents, { prefix: Messages.Prefix });
  const components: string[] = [];

  let index = 1;
  for (const icon of icons) {
    try {
      const iconName = getIconName(icon);
      const svg = await getIconContent(argv.icons, icon);
      const props = getSvgProps(svg);
      const content = getSvgContent(svg);

      await writeTemplate(
        templates.icon,
        {
          iconName,
          defaultIconSize: argv.defaultIconSize,
          props: props.join(" ").replace('"currentColor"', "{color}"),
          iconContent: content.replace('"currentColor"', "{color}"),
        },
        {
          output: path.join(argv.output, `${iconName}.tsx`),
          prettier: true,
        },
      );

      logMessage(
        Messages.GenerateComponentSuccess(iconName, index, icons.length),
        {
          prefix: Messages.Prefix,
          replace: true,
        },
      );

      components.push(iconName);
    } catch (error) {
      logMessage(Messages.ProcessingError(icon, error), {
        prefix: Messages.Prefix,
      });
    }
    index++;
  }
  clearLog();

  // Write additional files
  logMessage(Messages.WriteAdditionalFiles, { prefix: Messages.Prefix });
  await writeTemplate(
    templates.types,
    {},
    {
      output: path.join(argv.output, "types.ts"),
      prettier: true,
    },
  );

  // Generate the index file
  logMessage(Messages.WriteIndex, { prefix: Messages.Prefix });
  const indexFile =
    [
      `export * from "./types";`,
      ...components.map((component) => `export * from "./${component}";`),
    ].join("\n") + "\n";
  await fs.writeFile(path.join(argv.output, "index.ts"), indexFile);
  logMessage(Messages.WriteIndexSuccess, { prefix: Messages.Prefix });
};

export const GenerateIconsCommand: BaseCommand<GeneratePropsCommandOptions> = {
  trigger: "generate-icons",
  command: "generate-icons <icons> <output>",
  describe: "Generate icons components from SVG files",
  positional: {
    icons: {
      describe: "Path to the icons directory",
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
    defaultIconSize: {
      describe: "Default icon size",
      type: "number",
      default: 20,
    },
  },
  handler,
};
