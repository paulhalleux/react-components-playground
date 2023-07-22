#!/usr/bin/env node
import chalk from "chalk";
import { writeFile, mkdir, readFile, unlink } from "fs/promises";

import { compile } from "@mdx-js/mdx";
import { glob } from "glob";
import { LogMessages } from "./utils/log-messages";

const generateDocs = async () => {
  console.log(LogMessages.Discovering());
  const files = await glob("**/*.mdx", {
    cwd: "docs",
  });

  console.log(LogMessages.Generating(files.length));

  for (const file of files) {
    const mdxContent = await readFile(`./docs/${file}`, "utf8");
    const componentName = file.replace(/\.mdx$/, ""); // Remove the .mdx extension for the component name

    const jsxCode = await compile(mdxContent, {
      // @ts-ignore
      Fragment: "React.Fragment",
      jsx: true,
      jsxs: true,
    });

    await mkdir("./docs/_generated", { recursive: true });
    await writeFile(
      `./docs/_generated/${componentName}.jsx`,
      `import React from "react";\n\n${jsxCode}`,
    );

    console.log(LogMessages.Generated(file, componentName));
  }

  const components = files.map((file) => {
    const componentName = file.replace(/\.mdx$/, "");
    return `import ${componentName} from "./${componentName}";`;
  });

  const indexFile = `${components.join(
    "\n",
  )}\n\nexport const Components = {\n${files
    .map((file) => {
      const componentName = file.replace(/\.mdx$/, "");
      return `  ${componentName},`;
    })
    .join("\n")}\n}\n`;
  await writeFile("./docs/_generated/index.js", indexFile);

  console.log(LogMessages.IndexGenerated());
};

generateDocs();
