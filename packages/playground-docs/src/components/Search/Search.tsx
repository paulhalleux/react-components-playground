import React from "react";
import { useClickAway } from "react-use";
import clsx from "clsx";

import styles from "./Search.module.scss";

type AutoCompleteItemBase = {
  id: string;
  name: string;
};

type SearchProps<T extends AutoCompleteItemBase> = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  addon?:
    | React.ReactNode
    | ((input: React.RefObject<HTMLInputElement>) => React.ReactNode);
  autocompleteItems?: T[];
  renderAutocompleteItem?: (item: T, className: string) => React.ReactNode;
};

export function Search<T extends AutoCompleteItemBase>({
  value,
  onChange,
  placeholder,
  addon,
  renderAutocompleteItem,
  autocompleteItems,
}: SearchProps<T>) {
  const [searchValue, setSearchValue] = React.useState(value);
  const [focused, setFocused] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  }, []);

  const onSearchChange = (value: string) => {
    setSearchValue(value);
    onChange?.(value);
  };

  const onFocus = () => setFocused(true);
  const onClick = () => {
    onSearchChange("");
    setFocused(false);
  };

  useClickAway(containerRef, () => setFocused(false));

  const opened = renderAutocompleteItem && autocompleteItems && focused;

  return (
    <div className={styles.search__container} ref={containerRef}>
      <input
        ref={inputRef}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        type="text"
        className={clsx(styles.search, {
          [styles.opened]: opened,
        })}
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
        <div className={styles.search__autocomplete} tabIndex={-1}>
          {autocompleteItems
            .filter((item) => filterFn(item, searchValue || ""))
            .map((item) => (
              <div
                key={item.id}
                onClick={onClick}
                className={styles.search__autocomplete__item_container}
              >
                {renderAutocompleteItem(
                  item,
                  styles.search__autocomplete__item,
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

const filterFn = (item: AutoCompleteItemBase, value: string) =>
  item.name.toLowerCase().includes(value.toLowerCase());
