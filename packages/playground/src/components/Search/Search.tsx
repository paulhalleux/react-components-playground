import React from "react";
import { useClickAway } from "react-use";
import clsx from "clsx";

import styles from "./Search.module.scss";

export type SearchItemBase = {
  value: string;
  label: string;
};

export type SearchProps<T extends SearchItemBase> = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  addon?:
    | React.ReactNode
    | ((input: React.RefObject<HTMLInputElement>) => React.ReactNode);
  items?: T[];
  onItemSelect?: (item: T) => void;
  renderItem?: (item: T, className: string) => React.ReactNode;
};

export function Search<T extends SearchItemBase>({
  value = "",
  onChange,
  placeholder,
  addon,
  renderItem,
  onItemSelect,
  items,
}: SearchProps<T>) {
  const [searchValue, setSearchValue] = React.useState(value);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useClickAway(containerRef, () => setSearchValue(""));

  const onSearchChange = (value: string) => {
    setSearchValue(value);
    onChange?.(value);
  };

  const { opened, matchingItems } = React.useMemo(() => {
    const matchingItems = items?.filter((item) =>
      item.label.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return {
      opened: !!searchValue && matchingItems && matchingItems.length > 0,
      matchingItems,
    };
  }, [searchValue, items]);

  return (
    <div className={styles.search__container} ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        className={styles.search}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
      />
      {addon && (
        <div className={styles.search__addon}>
          {typeof addon === "function" ? addon(inputRef) : addon}
        </div>
      )}
      {opened && (
        <div className={styles.search__autocomplete__container}>
          {matchingItems?.map((item) => (
            <div
              key={item.value}
              className={clsx(!renderItem && styles.search__autocomplete__item)}
              tabIndex={renderItem ? 1 : -1}
              onClick={() => {
                onSearchChange("");
                onItemSelect?.(item);
              }}
            >
              {renderItem?.(item, styles.search__autocomplete__item) ??
                item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
