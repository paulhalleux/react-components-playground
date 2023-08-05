import React from "react";

export type BaseProps = {
  /**
   * The class name to be applied to the component.
   */
  className?: string;
  /**
   * The inline style to be applied to the component.
   */
  style?: React.CSSProperties;
  /**
   * The data test id to be applied to the component.
   */
  dataTestId?: string;
};
