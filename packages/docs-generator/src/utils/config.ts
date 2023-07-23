export const Config = {
  OutputPath: "docs/__generated__",
  BasePath: "docs",
  ExamplesPath: "./docs/examples",
  MdxGlob: "**/*.mdx",
  MdxGlobCwd: "docs/documentation",
  DocumentationPath: "docs/documentation",
  ExamplesGlob: "**/*.example.{js,jsx,ts,tsx}",
  ExamplesGlobCwd: "docs/examples",
  ImportMap: {
    [`"../components"`]: `"../../components"`,
  },
};
