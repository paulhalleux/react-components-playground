import { CSSProperties, ForwardedRef, forwardRef } from "react";

import { FlexProps } from "./Flex";

export type FlexItemProps = {
  order?: CSSProperties["order"];
  flexGrow?: CSSProperties["flexGrow"];
  flexShrink?: CSSProperties["flexShrink"];
  flexBasis?: CSSProperties["flexBasis"];
  alignSelf?: CSSProperties["alignSelf"];
} & FlexProps;

function FlexItem<T extends HTMLElement = HTMLDivElement>(
  props: FlexItemProps,
  ref: ForwardedRef<T>,
) {
  const {
    as: Component = "div",
    children,
    className,
    inline,
    grow = true,
    style: baseStyle,
    "data-test-id": dataTestId,
    ...rest
  } = props;

  const style: CSSProperties = {
    display: inline ? "inline-flex" : "flex",
    width: grow ? "100%" : undefined,
    ...baseStyle,
    ...rest,
  };

  return (
    <Component
      ref={ref}
      style={style}
      className={className}
      data-test-id={dataTestId}
    >
      {children}
    </Component>
  );
}

const ForwardFlexItem = forwardRef(FlexItem);
export { ForwardFlexItem as FlexItem };
