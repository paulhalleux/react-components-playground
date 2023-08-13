export type DocumentationMeta = Partial<{
  title: string;
  type: string;
  [key: string]: string;
}>;

export type DocumentationData = {
  id: string;
  raw: string;
  meta: DocumentationMeta;
  filePath: string;
  jsxCode: string;
};

export class ParsingError extends Error {
  constructor(
    message: string,
    public type: "metadata",
  ) {
    super(message);
  }
}
