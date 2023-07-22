import {
  BadgeIcon,
  PointerIcon,
  SelectionFrameIcon,
  SelectionIcon,
  TableIcon,
} from "@paulhalleux/react-playground";

import { Component } from "../types/component";

export const components: Component[] = [
  {
    name: "KeyframePath",
    path: "/components/keyframe-path",
    description: "A component to display a path with keyframes",
    icon: PointerIcon,
    status: "draft",
  },
  {
    name: "FrameSelector",
    path: "/components/frame-selector",
    description: "A component to select a frame",
    icon: SelectionIcon,
    status: "draft",
  },
  {
    name: "Selector",
    path: "/components/selector",
    description: "A component to select a value",
    icon: SelectionFrameIcon,
    status: "draft",
  },
  {
    name: "Table",
    path: "/components/table",
    description: "A component to display a table",
    icon: TableIcon,
    status: "wip",
  },
  {
    name: "Badge",
    path: "/components/badge",
    description: "A component to display a badge",
    icon: BadgeIcon,
    status: "done",
  },
].sort((a, b) => a.name.localeCompare(b.name));
