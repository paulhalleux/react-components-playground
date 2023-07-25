import * as fs from "fs/promises";
import { glob } from "glob";
import { Config } from "./config.js";

export async function generateExamples() {
  const files = await glob(Config.ExamplesGlob, {
    cwd: Config.ExamplesGlobCwd,
  });

  const exports = [];
  const sources = [];

  const examples = await Promise.all(
    files.map(async (file) => {
      const name = file
        .replace(/\.example\.[jt]sx?$/, "")
        .replace(/[\\\/]/, "");
      const filename = file.replace(/[\\]/, "/").replace(/\.[jt]sx?$/, "");

      const source = await fs.readFile(
        `${Config.ExamplesPath}/${file}`,
        "utf-8",
      );

      sources.push(`${name}: \`${source.replace(/`/g, "\\`")}\`,`);
      exports.push(name);

      return `import { default as ${name} } from "../examples/${filename}";`;
    }),
  );

  const exportedObject = `export const Examples = {\n${exports
    .map((name) => `\t${name},`)
    .join("\n")}\n};`;

  const exportedSources = `export const ExamplesSources = {\n${sources
    .map((source) => `\t${source}`)
    .join("\n")}\n};`;

  await fs.writeFile(
    `${Config.OutputPath}/examples.ts`,
    `${examples.join("\n")}\n\n${exportedObject}\n\n${exportedSources}`,
  );
}
