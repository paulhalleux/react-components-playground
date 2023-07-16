import { Point } from "./index";

export type Selectable = {
  id: string;
  position: Point;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
};

export type UnregisterFn = () => void;
export type RegisterFn = (id: Selectable) => UnregisterFn;
