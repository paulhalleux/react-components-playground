import { Meta } from "../index.js";

export function parseMetadata(metadata: string): Meta {
  return metadata
    .split("\n")
    .filter((line) => line.trim().match(/^[a-zA-Z0-9]+:/))
    .reduce((acc, line) => {
      const [key, value] = line.split(":");
      acc[key.trim()] = value.trim();
      return acc;
    }, {} as Meta);
}
