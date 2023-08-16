import React, { ForwardedRef, useImperativeHandle } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Input.module.scss";

export type InputState = "default" | "error" | "success" | "warning";
export type InputSize = "small" | "medium" | "large";
export type InputProps = {
  /**
   * The value of the input.
   */
  value: string;
  /**
   * Callback fired when the input value changes.
   */
  onChange: (value: string) => void;
  /**
   * The state of the input.
   */
  state?: InputState;
  /**
   * The size of the input.
   */
  size?: InputSize;
} & BaseProps &
  Omit<React.HTMLProps<HTMLInputElement>, "size" | "value" | "onChange">;

export type InputRef = {
  focus: () => void;
};

function Input(
  {
    state = "default",
    size = "medium",
    className,
    onChange,
    ...props
  }: InputProps,
  ref: ForwardedRef<InputRef>,
) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }),
    [],
  );

  return (
    <input
      ref={inputRef}
      onChange={(e) => onChange(e.target.value)}
      className={clsx(
        styles.input,
        styles[`input--${state}`],
        styles[`input--${size}`],
        className,
      )}
      {...props}
    />
  );
}

const ForwardedInput = React.forwardRef(Input);
export { ForwardedInput as Input };
