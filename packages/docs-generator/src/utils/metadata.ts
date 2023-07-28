import { Meta } from "../index.js";

export function parseMetadata(metadata: string): Meta {
  return metadata
    .split("\n")
    .filter((line) => line.trim().match(/^[a-zA-Z0-9]+:/))
    .reduce((acc, line) => {
      const indexOfKey = line.indexOf(":");
      const key = line.slice(0, indexOfKey);
      const value = line.slice(indexOfKey + 1);
      acc[key.trim()] = value.trim();
      return acc;
    }, {} as Meta);
}
