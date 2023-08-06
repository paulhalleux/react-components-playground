import { HTMLProps } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { Label } from "../Label";

import styles from "./Input.module.scss";

export type InputState = "default" | "error" | "success" | "warning";
export type InputSize = "small" | "medium" | "large";
export type InputProps = {
  /**
   * The label for the input.
   */
  label?: string;
  /**
   * The name of the input.
   */
  name?: string;
  /**
   * The id of the input.
   */
  id?: string;
  /**
   * The value of the input.
   */
  value: string;
  /**
   * Callback fired when the input value changes.
   */
  onChange: (value: string) => void;
  /**
   * The type of the input.
   */
  type?: HTMLProps<"input">["type"];
  /**
   * The placeholder of the input.
   */
  placeholder?: string;
  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;
  /**
   * The state of the input.
   */
  state?: InputState;
  /**
   * The size of the input.
   */
  size?: InputSize;
  /**
   * The message to display below the input.
   */
  message?: string;
  /**
   * Whether the input is required.
   */
  required?: boolean;
} & BaseProps;

export function Input({
  label,
  state = "default",
  size = "medium",
  required,
  message,
  className,
  onChange,
  dataTestId = "input",
  ...props
}: InputProps) {
  return (
    <div
      className={styles.input__container}
      data-test-id={`${dataTestId}-container`}
    >
      {label && (
        <Label
          required={required}
          htmlFor={props.id}
          dataTestId={`${dataTestId}-label`}
        >
          {label}
        </Label>
      )}
      <div className={styles.input__wrapper}>
        <input
          onChange={(e) => onChange(e.target.value)}
          data-test-id={`${dataTestId}-input`}
          className={clsx(
            styles.input,
            styles[`input--${state}`],
            styles[`input--${size}`],
            className,
          )}
          {...props}
        />
        {message && (
          <div
            className={clsx(
              styles.input__message,
              styles[`input__message--${state}`],
            )}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
