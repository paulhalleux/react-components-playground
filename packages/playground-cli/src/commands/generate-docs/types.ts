export type ComponentMeta = Partial<{
  title: string;
  path: string;
  category: string;
  description: string;
  status: string;
  icon: string;
  sourceUrl: string;
}>;

export type ComponentData = {
  id: string;
  raw: string;
  meta: ComponentMeta;
  filePath: string;
  jsxCode: string;
};
