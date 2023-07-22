import React from "react";
import { IconProps } from "@paulhalleux/react-playground";

export type Component = {
  name: string;
  path: string;
  description: string;
  icon: React.FC<IconProps>;
};
