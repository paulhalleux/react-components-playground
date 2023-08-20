import React, {
  createContext,
  ElementType,
  PropsWithChildren,
  useMemo,
} from "react";

type SlotContextType = {
  elements: React.ReactElement[];
};

const defaultValue: SlotContextType = {
  elements: [],
};

export const SlotContext = createContext<SlotContextType>(defaultValue);

export type SlotProviderProps = PropsWithChildren<{
  element: React.ReactNode;
}>;

export function SlotProvider({ element, children }: SlotProviderProps) {
  const ChildrenArray = useMemo(
    () => React.Children.toArray(element).filter(React.isValidElement),
    [element],
  );

  return (
    <SlotContext.Provider
      value={{
        elements: ChildrenArray,
      }}
    >
      {children}
    </SlotContext.Provider>
  );
}

export function useSlotContext() {
  return React.useContext(SlotContext);
}

export function useSlot(
  type: ElementType,
  condition?: (
    element: React.ReactElement,
    elements: React.ReactElement[],
  ) => boolean,
) {
  const { elements } = React.useContext(SlotContext);
  return elements.find(
    (element) =>
      element.type === type && (!condition || condition?.(element, elements)),
  );
}

export function useSlotExists(type: ElementType) {
  const { elements } = React.useContext(SlotContext);
  return elements.some((element) => element.type === type);
}
