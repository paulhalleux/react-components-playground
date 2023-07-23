#!/usr/bin/env node
import { writeFile, mkdir, readFile } from "fs/promises";

import { rimraf } from "rimraf";
import { compile } from "@mdx-js/mdx";
import { glob } from "glob";
import { Config } from "./utils/config.js";
import { getExamples } from "./utils/examples.js";
import { LogMessages } from "./utils/log-messages.js";

const generateDocs = async () => {
  rimraf.sync(Config.OutputPath);
  await mkdir(Config.OutputPath + "/documentation", { recursive: true });

  console.log(LogMessages.Discovering());

  const files = await glob(Config.MdxGlob, {
    cwd: Config.MdxGlobCwd,
  });

  console.log(LogMessages.Generating(files.length));

  for (const file of files) {
    const mdxContent = await readFile(
      `${Config.DocumentationPath}/${file}`,
      "utf8",
    );

    const componentName = file.replace(/\.mdx$/, ""); // Remove the .mdx extension for the component name

    const jsxCode = await compile(mdxContent, {
      // @ts-ignore
      Fragment: "React.Fragment",
      jsx: true,
      jsxs: true,
    });

    let mapped = jsxCode.toString();
    for (const [key, value] of Object.entries(Config.ImportMap)) {
      mapped = mapped.replace(new RegExp(key, "g"), value);
    }

    await getExamples();
    await writeFile(
      `${Config.OutputPath}/documentation/${componentName}.jsx`,
      `${mapped}`,
    );

    console.log(LogMessages.Generated(file, componentName));
  }

  const componentImports = files.map((file) => {
    const componentName = file.replace(/\.mdx$/, "");
    return `import ${componentName} from "./documentation/${componentName}";`;
  });

  const indexParts = [
    componentImports.join("\n"),
    `export const Components = {`,
    files
      .map((file) => {
        const componentName = file.replace(/\.mdx$/, "");
        return `  ${componentName},`;
      })
      .join("\n"),
    `}`,
    `export * from "./examples";`,
  ];

  await writeFile(`${Config.OutputPath}/index.ts`, indexParts.join("\n"));

  console.log(LogMessages.IndexGenerated());
};

generateDocs();
