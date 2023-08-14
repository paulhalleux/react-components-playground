import {
  CSSProperties,
  ElementType,
  FC,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
} from "react";

import { ForwardedComponent } from "../../types";

import { FlexItemProps } from "./FlexItem";
import { FlexItem } from "./index";

export type FlexProps = PropsWithChildren<{
  as?: ElementType;
  flexDirection?: CSSProperties["flexDirection"];
  flexWrap?: CSSProperties["flexWrap"];
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  alignContent?: CSSProperties["alignContent"];
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  inline?: boolean;
  grow?: boolean;
  className?: string;
  style?: CSSProperties;
  "data-test-id"?: string;
}>;

function Flex<T extends HTMLElement = HTMLDivElement>(
  { children, ...props }: FlexProps,
  ref: ForwardedRef<T>,
) {
  return (
    <FlexItem ref={ref} {...props}>
      {children}
    </FlexItem>
  );
}

const ForwardFlex = forwardRef(Flex) as ForwardedComponent<
  FlexProps,
  HTMLElement,
  { Item: FC<FlexItemProps> }
>;

ForwardFlex.Item = FlexItem;

export { ForwardFlex as Flex };
