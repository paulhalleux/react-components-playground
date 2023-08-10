import React, { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";

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
} & BaseProps;

export function EditInline({
  value,
  onChange,
  maxWidth = 300,
}: EditInlineProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const widthProviderRef = useRef<HTMLSpanElement>(null);

  const [width, setWidth] = useState<number>(0);
  const [editValue, setEditValue] = useState(value);
  const [editing, setEditing] = useState(false);

  useClickAway(inputRef, () => setEditing(false));

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    setWidth(widthProviderRef.current?.offsetWidth || 0);
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

  const onDoubleClick = () => {
    setEditing(true);
    setEditValue(value);
  };

  const onClose = () => {
    setEditing(false);
    setWidth(0);
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditValue(e.target.value);

  return (
    <div ref={inputRef}>
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
            className={styles.edit__input}
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
        <span className={styles.edit__value} onDoubleClick={onDoubleClick}>
          {value}
        </span>
      )}
    </div>
  );
}
