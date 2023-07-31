import { HTMLProps } from "react";
import clsx from "clsx";

import { Label } from "../Label";

import styles from "./Input.module.scss";

export type InputState = "default" | "error" | "success" | "warning";
export type InputSize = "small" | "medium" | "large";
export type InputProps = {
  label?: string;
  name?: string;
  id?: string;
  value: string;
  onChange: (value: string) => void;
  type?: HTMLProps<"input">["type"];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  state?: InputState;
  size?: InputSize;
  message?: string;
  required?: boolean;
};

export function Input({
  label,
  state = "default",
  size = "medium",
  required,
  message,
  className,
  onChange,
  ...props
}: InputProps) {
  return (
    <div className={styles.input__container}>
      {label && (
        <Label required={required} htmlFor={props.id}>
          {label}
        </Label>
      )}
      <div className={styles.input__wrapper}>
        <input
          onChange={(e) => onChange(e.target.value)}
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
