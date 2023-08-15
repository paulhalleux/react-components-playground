import * as fs from "fs/promises";
import startCase from "lodash/startCase";
import * as path from "path";

/**
 * Get the icon name from the filename
 * @param filename Filename
 * @returns Icon name
 */
export function getIconName(filename: string) {
  const clean = filename
    .replace(".svg", "")
    .split(/[\/\\]/)
    .pop();
  return startCase(clean).replace(/ /g, "") + "Icon";
}

/**
 * Get the icon content
 * @param root Path to the icons directory
 * @param filename Filename
 * @returns Icon content
 */
export async function getIconContent(root: string, filename: string) {
  return await fs.readFile(path.join(root, filename), "utf-8");
}

/**
 * Get the props of the SVG
 * @param content SVG content
 * @returns Props except height and width
 */
export function getSvgProps(content: string) {
  const svg = content.match(/<svg(.+?)>(.+?)<\/svg>/s);
  if (!svg) {
    throw new Error("SVG not found");
  }

  const cleaned = svg[1]
    .replace(/[^-]height="(.+?)"/, "")
    .replace(/[^-]width="(.+?)"/, "")
    .replace(/class="(.+?)"/, "");

  return cleaned.split(" ");
}

/**
 * Get the SVG content
 * @param content SVG content
 * @returns SVG content
 */
export function getSvgContent(content: string) {
  const svg = content.match(/<svg(.+?)>(.+?)<\/svg>/s);
  if (!svg) {
    throw new Error("SVG not found");
  }
  return svg[2];
}

/**
 * Clean up the end of line
 * @param content Content
 * @returns Cleaned up content
 */
export function cleanEndOfLine(content: string) {
  return content.replace(/\r\n/g, "\n");
}
