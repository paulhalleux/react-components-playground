import React from "react";

export { Example } from "./Example";

export type ExampleMetadata = {
  name: string;
  component: React.ComponentType<ExampleComponentProps<any, any>>;
  controls?: Control[];
};

export type ExampleComponentProps<TControl = {}, TExtend = {}> = {
  controls: TControl;
} & TExtend;

export type ControlBase = {
  label: string;
  property: string;
};

export type SelectControl = ControlBase & {
  type: "select";
  options: string[];
  value: string;
};

export type NumberControl = ControlBase & {
  type: "number";
  value: number;
  min?: number;
  max?: number;
  step?: number;
};

export type BooleanControl = ControlBase & {
  type: "boolean";
  value: boolean;
};

export type StringControl = ControlBase & {
  type: "string";
  value: string;
};

export type Control =
  | SelectControl
  | NumberControl
  | BooleanControl
  | StringControl;
