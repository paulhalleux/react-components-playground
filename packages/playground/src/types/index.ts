import { ForwardRefExoticComponent, RefAttributes } from "react";

export * from "./theme";
export * from "./helpers";
export * from "./props";

export type ForwardedComponent<
  Props,
  Ref,
  Extend = object,
> = ForwardRefExoticComponent<Props & RefAttributes<Ref>> & Extend;
