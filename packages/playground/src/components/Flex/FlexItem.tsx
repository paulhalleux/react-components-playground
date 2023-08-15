import { CSSProperties, ForwardedRef, forwardRef } from "react";
import omit from "lodash/omit";
import pick from "lodash/pick";

import { FlexProps, flexProps } from "./Flex";

export type FlexItemProps<TProps = object> = {
  order?: CSSProperties["order"];
  flexGrow?: CSSProperties["flexGrow"];
  flexShrink?: CSSProperties["flexShrink"];
  flexBasis?: CSSProperties["flexBasis"];
  alignSelf?: CSSProperties["alignSelf"];
} & FlexProps &
  TProps;

function FlexItem<T extends HTMLElement = HTMLDivElement, TProps = object>(
  props: FlexItemProps<TProps>,
  ref: ForwardedRef<T>,
) {
  const {
    as: Component = "div",
    children,
    className,
    inline,
    grow = true,
    style: baseStyle,
    dataTestId,
    ...rest
  } = props;

  const style: CSSProperties = {
    display: inline ? "inline-flex" : "flex",
    width: grow ? "100%" : undefined,
    ...pick(rest, flexProps),
    ...baseStyle,
  };

  return (
    <Component
      ref={ref}
      style={style}
      className={className}
      data-test-id={dataTestId}
      {...omit(rest, flexProps)}
    >
      {children}
    </Component>
  );
}

const ForwardFlexItem = forwardRef(FlexItem);
export { ForwardFlexItem as FlexItem };
