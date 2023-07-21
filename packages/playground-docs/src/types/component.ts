import React from "react";

import { IconProps } from "../components/Icons/types";

export type Component = {
  name: string;
  path: string;
  description: string;
  icon: React.FC<IconProps>;
};
