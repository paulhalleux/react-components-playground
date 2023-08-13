export enum DocumentationType {
  Component = "component",
  Hook = "hook",
  Utility = "utility",
}

export type DocumentationPage<TMeta = BaseMeta> = {
  id: string;
  title: string;
  type: DocumentationType;
  path?: string;
} & TMeta;

export type BaseMeta = {
  sourceUrl: string;
  description: string;
  status: "todo" | "wip" | "done";
};

export type ComponentMeta = {
  category?: string;
  icon?: string;
} & BaseMeta;

export type HookMeta = BaseMeta;
export type UtilityMeta = BaseMeta;
