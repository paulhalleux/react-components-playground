#!/usr/bin/env node
import { mkdir, writeFile } from "fs/promises";
import { glob } from "glob";
import { parse } from "react-docgen-typescript";
import { LogMessages } from "./utils/log-messages.js";

type ComponentProp = {
  name: string;
  description: string;
  type: string;
  required: boolean;
  defaultValue: string;
};

const generateProps = async () => {
  const componentsPath = process.argv[2].replace(/\\/g, "/");
  const files = await glob(`${componentsPath}/**/*.tsx`);

  const output = process.argv[3];

  const components = new Map<string, ComponentProp[]>();

  console.log(LogMessages.GeneratingProps);

  for (const file of files) {
    const parsed = parse(file);

    if (!parsed[0]) {
      console.log(LogMessages.NoProps(file));
      continue;
    }

    const componentName = parsed[0].displayName;
    const props = parsed[0].props;

    if (props) {
      const componentProps = Object.keys(props).map((key) => {
        const prop = props[key];
        return {
          name: key,
          description: prop.description,
          type: prop.type.name,
          required: prop.required,
          defaultValue: prop.defaultValue?.value,
        };
      });

      components.set(componentName, componentProps);
      console.log(
        LogMessages.GeneratedProps(
          componentName,
          components.size,
          files.length,
        ),
      );
    }
  }

  await mkdir(output, { recursive: true });
  await writeFile(
    `${output}/props.json`,
    JSON.stringify(
      [...components.entries()].reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {},
      ),
    ),
    "utf8",
  );
  console.log(LogMessages.PropsGenerated());
};

generateProps().catch(console.error);
