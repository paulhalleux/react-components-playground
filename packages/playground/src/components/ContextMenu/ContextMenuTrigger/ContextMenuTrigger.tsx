import { PropsWithChildren } from "react";

export type ContextMenuTriggerProps = PropsWithChildren;

export function ContextMenuTrigger({ children }: ContextMenuTriggerProps) {
  return <>{children}</>;
}
