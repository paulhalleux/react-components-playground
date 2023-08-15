import {
  CSSProperties,
  ElementType,
  FC,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
} from "react";

import { BaseProps, ForwardedComponent } from "../../types";

import { FlexItem, FlexItemProps } from "./FlexItem";

export const flexProps = [
  "flexDirection",
  "flexWrap",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "order",
  "alignSelf",
  "justifySelf",
  "justifyContent",
  "alignItems",
  "alignContent",
  "gap",
  "rowGap",
  "columnGap",
  "inline",
  "grow",
];

export type FlexProps<TProps = object> = PropsWithChildren<{
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
}> &
  BaseProps &
  TProps;

function Flex<T extends HTMLElement = HTMLDivElement, TProps = object>(
  { children, ...props }: FlexProps<TProps>,
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
