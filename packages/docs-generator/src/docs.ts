#!/usr/bin/env node
import { compile } from "@mdx-js/mdx";
import { mkdir, readFile, writeFile } from "fs/promises";
import { glob } from "glob";
import startCase from "lodash/startCase.js";
import { TitlePlugin } from "./mdx/title-plugin.js";
import { Config } from "./utils/config.js";
import { generateExamples } from "./utils/examples.js";
import { LogMessages } from "./utils/log-messages.js";
import { parseMetadata } from "./utils/metadata.js";

export type Meta = Partial<{
  title: string;
  path: string;
  category: string;
  description: string;
  status: string;
  icon: string;
  sourceUrl: string;
}>;

type ComponentData = {
  mdxContent: string;
  meta: Meta;
  id: string;
  filePath: string;
  jsxCode: string | undefined;
};

function cleanFilename(filename: string) {
  return startCase(filename.replace(/\.mdx$/, "")).replace(/\s/g, "");
}

const generateDocs = async () => {
  // rimraf.sync(Config.OutputPath);
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
      meta: {},
      id: cleanFilename(defaultName),
      filePath: defaultName,
      jsxCode: undefined,
    };

    if (mdxContent.startsWith("---")) {
      const content = mdxContent.split("---");
      componentData.mdxContent = content[2];
      componentData.meta = {
        title: defaultName.split(/[\/\\]/g).pop(),
        ...parseMetadata(content[1]),
      };
    }

    const jsxCode = await compile(componentData.mdxContent, {
      // @ts-ignore
      Fragment: "React.Fragment",
      jsx: true,
      jsxs: true,
      remarkPlugins: [TitlePlugin],
    });

    componentData.jsxCode = jsxCode.toString();
    for (const [key, value] of Object.entries(Config.ImportMap)) {
      componentData.jsxCode = componentData.jsxCode.replace(
        new RegExp(key, "g"),
        value,
      );
    }

    components.set(componentData.id, componentData);
  }

  const indexParts: string[] = [];

  await Promise.all(
    Array.from(components.entries()).map(async ([_, componentData]) => {
      const importStatement = `import ${
        componentData.id
      } from "./documentation/${componentData.filePath.replace("\\", "/")}";`;
      indexParts.push(importStatement);

      await mkdir(
        `${Config.OutputPath}/documentation/${componentData.filePath
          .split(/[\/\\]/g)
          .slice(0, -1)
          .join("\\")}`,
        { recursive: true },
      );

      await writeFile(
        `${Config.OutputPath}/documentation/${componentData.filePath}.jsx`,
        `${componentData.jsxCode}`,
      );

      console.log(LogMessages.Generated(componentData.id));
    }),
  );

  indexParts.push(
    `\nexport const Components = {`,
    Array.from(components.entries())
      .map(([fileName, componentData]) => `  ${componentData.id},`)
      .join("\n"),
    `}`,
    `\nexport * from "./examples";`,
  );

  await generateExamples();
  await writeFile(`${Config.OutputPath}/index.ts`, indexParts.join("\n"));
  await writeFile(
    `${Config.OutputPath}/components.ts`,
    [
      `export type ComponentMeta = Partial<{\n\tsourceUrl: string;\n\tdescription: string;\n\tpath: string;\n\tcategory: string;\n\tstatus: string;\n\ticon: string;\n}> & { title: string; id: string; };`,
      `export const ComponentList: Record<string, ComponentMeta> = {`,
      ...Array.from(components.entries()).map(
        ([_, componentData]) =>
          `  ${componentData.id}: ${JSON.stringify({
            id: componentData.id,
            ...componentData.meta,
          })},`,
      ),
      `}`,
    ].join("\n"),
  );

  console.log(LogMessages.IndexGenerated());
};

generateDocs().catch(console.error);
