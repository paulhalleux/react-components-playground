import React, { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./EditInline.module.scss";

export type EditInlineProps = {
  /**
   * The value of the input
   */
  value: string;
  /**
   * The function to call when the value changes
   */
  onChange: (value: string) => void;
  /**
   * The maximum width of the input
   */
  maxWidth?: number;
  /**
   * The trigger to start editing
   */
  trigger?: "click" | "double-click";
  /**
   * The class name of the input
   */
  inputClassName?: string;
} & BaseProps;

export function EditInline({
  value,
  onChange,
  trigger = "double-click",
  maxWidth = 300,
  className,
  inputClassName,
  ...rest
}: EditInlineProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const widthProviderRef = useRef<HTMLSpanElement>(null);

  const [width, setWidth] = useState<number>(0);
  const [editValue, setEditValue] = useState(value);
  const [editing, setEditing] = useState(false);

  const onClose = () => {
    setEditing(false);
    setWidth(0);
  };

  useClickAway(inputRef, onClose);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    setWidth((widthProviderRef.current?.offsetWidth || 0) + 5);
  }, [editValue]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClose();
      if (editValue.trim().length > 0) {
        onChange(editValue);
        setEditValue(value);
      }
    } else if (e.key === "Escape") {
      onClose();
      setEditValue(value);
    }
  };

  const onClick = () => {
    if (trigger !== "click") return;
    setEditing(true);
    setEditValue(value);
  };

  const onDoubleClick = () => {
    if (trigger !== "double-click") return;
    setEditing(true);
    setEditValue(value);
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditValue(e.target.value);

  return (
    <div ref={inputRef} className={className} {...rest}>
      {editing ? (
        <>
          <span
            ref={widthProviderRef}
            className={styles.edit__value}
            style={{
              visibility: "hidden",
              position: "absolute",
              top: "-100%",
              left: "-100%",
            }}
          >
            {editValue}
          </span>
          <input
            autoFocus
            className={clsx(styles.edit__input, inputClassName)}
            type="text"
            value={editValue}
            onChange={onValueChange}
            onKeyDown={onKeyDown}
            onBlur={onClose}
            style={{
              width,
              maxWidth,
              minWidth: `${value.length - 1 < 3 ? 3 : value.length - 1}ch`,
            }}
          />
        </>
      ) : (
        <span
          className={styles.edit__value}
          onDoubleClick={onDoubleClick}
          onClick={onClick}
        >
          {value}
        </span>
      )}
    </div>
  );
}
