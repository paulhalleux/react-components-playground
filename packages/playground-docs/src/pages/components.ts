import {
  BadgeIcon,
  CodeIcon,
  InputSearchIcon,
  PointerIcon,
  SelectionFrameIcon,
  SelectionIcon,
  TableIcon,
  TabsIcon,
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
    status: "done",
  },
  {
    name: "Badge",
    path: "/components/badge",
    description: "A component to display a badge",
    icon: BadgeIcon,
    status: "done",
  },
  {
    name: "Tabs",
    path: "/components/tabs",
    description: "A component to display tabs",
    icon: TabsIcon,
    status: "done",
  },
  {
    name: "CodeBlock",
    path: "/components/code-block",
    description: "A component to display a code block",
    icon: CodeIcon,
    status: "done",
  },
  {
    name: "Search",
    path: "/components/search",
    description: "A component to search with autocomplete",
    icon: InputSearchIcon,
    status: "todo",
  },
  {
    name: "Button",
    path: "/components/button",
    description: "A component to display a button",
    icon: InputSearchIcon,
    status: "todo",
  },
].sort((a, b) => a.name.localeCompare(b.name));
