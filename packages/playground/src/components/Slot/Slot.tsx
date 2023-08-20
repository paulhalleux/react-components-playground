import React, { ElementType, JSX } from "react";

import { useSlot } from "./slot-context";

export type SlotProps<ElementProps> = {
  elementType: ElementType;
  condition?: (element: JSX.Element, elements: JSX.Element[]) => boolean;
  children?: (element: JSX.Element) => JSX.Element;
  props?: ElementProps;
};

export function Slot<ElementProps extends Record<string, any>>({
  elementType,
  children,
  props,
  condition,
}: SlotProps<ElementProps>) {
  const element = useSlot(elementType, condition);

  if (!element) return null;
  const elementWithProps = React.cloneElement(element, {
    ...props,
  });

  return children ? children(elementWithProps) : elementWithProps;
}
