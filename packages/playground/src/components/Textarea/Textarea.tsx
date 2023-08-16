import React, { ForwardedRef, useImperativeHandle } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { InputRef, InputState } from "../Input";

import styles from "./Textarea.module.scss";

export type TextareaProps = {
  /**
   * The value of the textarea.
   */
  value: string;
  /**
   * Callback fired when the textarea value changes.
   */
  onChange: (value: string) => void;
  /**
   * The state of the textarea.
   */
  state?: InputState;
  /**
   * Whether the textarea should be resizable.
   */
  resize?: "none" | "both" | "horizontal" | "vertical";
} & BaseProps &
  Omit<React.HTMLProps<HTMLTextAreaElement>, "value" | "onChange">;

function Textarea(
  {
    state = "default",
    className,
    onChange,
    resize = "vertical",
    style,
    ...props
  }: TextareaProps,
  ref: ForwardedRef<InputRef>,
) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        textareaRef.current?.focus();
      },
    }),
    [],
  );

  return (
    <textarea
      ref={textareaRef}
      onChange={(e) => onChange(e.target.value)}
      className={clsx(styles.textarea, styles[`textarea--${state}`], className)}
      {...props}
      style={{
        resize,
        ...style,
      }}
    >
      {props.value}
    </textarea>
  );
}

const ForwardedTextarea = React.forwardRef(Textarea);
export { ForwardedTextarea as Textarea };
