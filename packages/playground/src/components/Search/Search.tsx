import React, { useEffect, useMemo, useRef, useState } from "react";
import { useClickAway } from "react-use";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { Loader } from "../Loader";

import styles from "./Search.module.scss";

export type SearchItemBase = {
  value: string;
  label: string;
};

export type SearchProps<T extends SearchItemBase> = {
  /**
   * The value of the search.
   */
  value?: string;
  /**
   * The callback to call when the value changes.
   */
  onChange?: (value: string) => void;
  /**
   * The placeholder to display.
   */
  placeholder?: string;
  /**
   * The addon to display.
   */
  addon?:
    | React.ReactNode
    | ((input: React.RefObject<HTMLInputElement>) => React.ReactNode);
  /**
   * The items to display.
   */
  items?: T[] | ((searchValue: string) => Promise<T[]>);
  /**
   * The callback to call when an item is selected.
   */
  onItemSelect?: (item: T) => void;
  /**
   * The callback to call when an item is rendered.
   */
  renderItem?: (item: T, className: string) => React.ReactNode;
} & BaseProps;

export function Search<T extends SearchItemBase>({
  value = "",
  onChange,
  placeholder,
  addon,
  renderItem,
  onItemSelect,
  items,
  className,
  dataTestId = "search",
  ...rest
}: SearchProps<T>) {
  const [searchValue, setSearchValue] = useState(value);
  const [fetching, setFetching] = useState(false);
  const [itemsCache, setItemsCache] = useState<T[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickAway(containerRef, () => setSearchValue(""));

  const onSearchChange = (value: string) => {
    setSearchValue(value);
    onChange?.(value);
  };

  const { opened, matchingItems } = useMemo(() => {
    const matchingItems = itemsCache?.filter((item) =>
      item.label.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return {
      opened:
        (!!searchValue && matchingItems && matchingItems.length > 0) ||
        fetching,
      matchingItems,
    };
  }, [searchValue, itemsCache]);

  useEffect(() => {
    if (typeof items === "function") {
      setFetching(true);
      const to = setTimeout(() => {
        items(searchValue)
          .then((items) => setItemsCache(items))
          .finally(() => setFetching(false));
      }, 500);

      return () => clearTimeout(to);
    } else {
      setItemsCache(items ?? []);
    }
  }, [searchValue, items]);

  return (
    <div
      className={clsx(styles.search__container, className)}
      ref={containerRef}
      data-test-id={`${dataTestId}-container`}
      {...rest}
    >
      <input
        ref={inputRef}
        type="text"
        className={styles.search}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        data-test-id={`${dataTestId}-input`}
      />
      {addon && (
        <div
          className={styles.search__addon}
          data-test-id={`${dataTestId}-addon`}
        >
          {typeof addon === "function" ? addon(inputRef) : addon}
        </div>
      )}
      {opened && (
        <div
          className={styles.search__autocomplete__container}
          tabIndex={-1}
          data-test-id={`${dataTestId}-autocomplete`}
        >
          {fetching && (
            <div className={styles.search__autocomplete__item}>
              <Loader size="small" />
            </div>
          )}
          {!fetching &&
            matchingItems?.map((item) => (
              <div
                key={item.value}
                className={clsx(
                  !renderItem && styles.search__autocomplete__item,
                )}
                tabIndex={renderItem ? -1 : 0}
                onClick={() => {
                  onSearchChange("");
                  onItemSelect?.(item);
                }}
                data-test-id={`${dataTestId}-autocomplete-item`}
                onKeyDown={
                  !renderItem
                    ? (e) => {
                        if (e.key === "Enter") {
                          onSearchChange("");
                          onItemSelect?.(item);
                        }
                      }
                    : undefined
                }
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
