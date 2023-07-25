#!/usr/bin/env node
import { writeFile, mkdir, readFile } from "fs/promises";

import { rimraf } from "rimraf";
import { compile } from "@mdx-js/mdx";
import { glob } from "glob";
import { Config } from "./utils/config.js";
import { generateExamples } from "./utils/examples.js";
import { LogMessages } from "./utils/log-messages.js";
import { parseMetadata } from "./utils/metadata.js";

export type Meta = Partial<{
  path: string;
  category: string;
  description: string;
  status: string;
  icon: string;
}> & {
  fileName: string;
  title: string;
};

type ComponentData = {
  mdxContent: string;
  meta: Meta;
  jsxCode: string | undefined;
};

const generateDocs = async () => {
  rimraf.sync(Config.OutputPath);
  await mkdir(Config.OutputPath + "/documentation", { recursive: true });

  console.log(LogMessages.Discovering());

  const files = await glob(Config.MdxGlob, {
    cwd: Config.MdxGlobCwd,
  });

  console.log(LogMessages.Generating(files.length));

  const components = new Map<string, ComponentData>();

  for (const file of files) {
    const mdxContent = await readFile(
      `${Config.DocumentationPath}/${file}`,
      "utf8",
    );

    const defaultName = file.replace(/\.mdx$/, "");
    let componentData: ComponentData = {
      mdxContent: mdxContent,
      meta: { title: defaultName, fileName: defaultName },
      jsxCode: undefined,
    };

    if (mdxContent.startsWith("---")) {
      const content = mdxContent.split("---");
      componentData.mdxContent = content[2];
      componentData.meta = {
        title: defaultName,
        ...parseMetadata(content[1]),
        fileName: defaultName,
      };
    }

    const jsxCode = await compile(componentData.mdxContent, {
      // @ts-ignore
      Fragment: "React.Fragment",
      jsx: true,
      jsxs: true,
    });

    componentData.jsxCode = jsxCode.toString();
    for (const [key, value] of Object.entries(Config.ImportMap)) {
      componentData.jsxCode = componentData.jsxCode.replace(
        new RegExp(key, "g"),
        value,
      );
    }

    components.set(componentData.meta.fileName, componentData);
  }

  const indexParts: string[] = [];

  await Promise.all(
    Array.from(components.entries()).map(
      async ([componentName, componentData]) => {
        const importStatement = `import ${componentData.meta.fileName} from "./documentation/${componentData.meta.fileName}";`;
        indexParts.push(importStatement);

        await writeFile(
          `${Config.OutputPath}/documentation/${componentData.meta.fileName}.jsx`,
          `${componentData.jsxCode}`,
        );
        console.log(LogMessages.Generated(componentName));
      },
    ),
  );

  indexParts.push(
    `\nexport const Components = {`,
    Array.from(components.keys())
      .map((fileName) => `  ${fileName},`)
      .join("\n"),
    `}`,
    `\nexport * from "./examples";`,
  );

  await generateExamples();
  await writeFile(`${Config.OutputPath}/index.ts`, indexParts.join("\n"));
  await writeFile(
    `${Config.OutputPath}/components.ts`,
    [
      `export type ComponentMeta = Partial<{\n\tdescription: string;\n\tpath: string;\n\tcategory: string;\n\tstatus: string;\n\ticon: string;\n}> & { title: string; fileName: string; };`,
      `export const ComponentList: Record<string, ComponentMeta> = {`,
      ...Array.from(components.entries()).map(
        ([componentName, componentData]) =>
          `  ${componentData.meta.fileName}: ${JSON.stringify(
            componentData.meta,
          )},`,
      ),
      `}`,
    ].join("\n"),
  );

  console.log(LogMessages.IndexGenerated());
};

generateDocs().catch(console.error);
