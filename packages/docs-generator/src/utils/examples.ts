import * as fs from "fs/promises";
import { glob } from "glob";

export async function getExamples() {
  const files = await glob("**/*.example.{js,jsx,ts,tsx}", {
    cwd: "docs/examples",
  });

  const exports = [];
  const sources = [];

  const examples = await Promise.all(
    files.map(async (file) => {
      const name = file
        .replace(/\.example\.[jt]sx?$/, "")
        .replace(/[\\\/]/, "");
      const filename = file.replace(/[\\]/, "/").replace(/\.[jt]sx?$/, "");

      const source = await fs.readFile(`docs/examples/${file}`, "utf-8");
      sources.push(`${name}: \`${source}\`,`);
      exports.push(name);

      return `import { default as ${name} } from "../examples/${filename}";`;
    }),
  );

  const exportedObject = `export const Examples = {\n${exports
    .map((name) => `\t${name},`)
    .join("\n")}\n};`;

  const exportedSources = `export const Sources = {\n${sources
    .map((source) => `\t${source}`)
    .join("\n")}\n};`;

  await fs.writeFile(
    "docs/_generated/_examples.ts",
    `${examples.join("\n")}\n\n${exportedObject}\n\n${exportedSources}`,
  );
}
