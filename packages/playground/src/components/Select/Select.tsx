import React, { useMemo, useRef, useState } from "react";
import { useClickAway } from "react-use";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { ChevronDownIcon } from "../Icons";
import { InputSize, InputState } from "../Input";

import styles from "./Select.module.scss";

export type SelectOption = { label: string; value: string; disabled?: boolean };
export type SelectProps = {
  /**
   * ID of the select
   */
  id?: string;
  /**
   * Name of the select
   */
  name?: string;
  /**
   * Size of the select
   */
  size?: InputSize;
  /**
   * State of the select
   */
  state?: InputState;
  /**
   * Value of the select
   */
  value?: string;
  /**
   * Callback when the value changes
   */
  onChange?: (value: string) => void;
  /**
   * Options of the select
   */
  options?: SelectOption[];
  /**
   * If the select is disabled
   */
  disabled?: boolean;
} & BaseProps;

export function Select({
  id,
  name,
  size = "medium",
  state = "default",
  className,
  options,
  value,
  onChange,
  disabled,
  ...rest
}: SelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selectedOption = useMemo(() => {
    return options?.find((option) => option.value === value);
  }, [options, value]);

  useClickAway(containerRef, () => setOpen(false));

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "ArrowDown") {
      setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const onSelect = (option: SelectOption) => {
    if (!disabled && !option.disabled) onChange?.(option.value);
    setOpen(false);
  };

  const onItemKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    option: SelectOption,
  ) => {
    if (e.key === "Enter") {
      onSelect(option);
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        styles.select,
        styles[`select--${size}`],
        {
          [styles["select--open"]]: open,
          [styles["select--disabled"]]: disabled,
        },
        className,
      )}
      tabIndex={0}
      onKeyDown={onKeyDown}
      {...rest}
    >
      <select
        onFocus={() => !disabled && setOpen(true)}
        className={styles.select__hidden}
        value={value}
        disabled={disabled}
        name={name}
        id={id}
      >
        {options?.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div
        className={clsx(
          styles.select__selected,
          styles[`select__selected--${size}`],
          styles[`select__selected--${state}`],
        )}
        tabIndex={0}
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        {selectedOption?.label}
        <ChevronDownIcon size={16} className={clsx(styles.select__icon)} />
      </div>
      {open && (
        <ul className={styles.select__dropdown} tabIndex={-1}>
          {options?.map((option) => (
            <li
              key={option.value}
              tabIndex={0}
              className={clsx(styles.select__dropdown__item, {
                [styles["select__dropdown__item--selected"]]:
                  option.value === value,
                [styles["select__dropdown__item--disabled"]]: option.disabled,
              })}
              onClick={() => onSelect(option)}
              onKeyDown={(e) => onItemKeyDown(e, option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
