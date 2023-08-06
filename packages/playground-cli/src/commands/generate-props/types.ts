export type ComponentProp = {
  name: string;
  description: string;
  type: string;
  required: boolean;
  defaultValue: string;
};

export type ParsedComponent = {
  displayName: string;
  props: ComponentProp[];
};
