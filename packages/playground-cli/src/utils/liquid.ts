import fs from "fs/promises";
import { Liquid } from "liquidjs";
import prettier from "prettier";
import { cleanEndOfLine } from "../commands/generate-icons/utils";

export async function writeTemplate<TData extends object>(
  template: string,
  data?: TData,
  options?: {
    output?: string;
    transform?: (content: string) => string;
    prettier?: boolean;
  },
) {
  const engine = new Liquid();
  let parsed = await engine.parseAndRender(template, data);

  if (options?.transform) {
    parsed = options.transform(parsed);
  }

  if (options?.prettier) {
    parsed = await prettier.format(parsed, {
      parser: "typescript",
    });
  }

  if (options?.output) {
    await fs.writeFile(options?.output, cleanEndOfLine(parsed), {
      encoding: "utf-8",
    });
  }
}
