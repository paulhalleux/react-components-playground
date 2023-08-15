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
