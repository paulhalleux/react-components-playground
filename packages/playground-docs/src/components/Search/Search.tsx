import React from "react";

import styles from "./Search.module.scss";

type SearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  addon?: React.ReactNode | ((input: HTMLInputElement) => React.ReactNode);
};

export function Search({ value, onChange, placeholder, addon }: SearchProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  }, []);

  return (
    <div className={styles.search__container}>
      <input
        ref={inputRef}
        onKeyDown={onKeyDown}
        type="text"
        className={styles.search}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
      />
      {addon && (
        <div className={styles.search__addon}>
          {typeof addon === "function" ? addon(inputRef.current!) : addon}
        </div>
      )}
    </div>
  );
}
