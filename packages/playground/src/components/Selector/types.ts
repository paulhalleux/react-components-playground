import { Point } from "../../types";

export type Selectable = {
  id: string;
  position: Point;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
};

export type UnregisterFn = () => void;
export type RegisterSelectableFn = (id: Selectable) => UnregisterFn;
