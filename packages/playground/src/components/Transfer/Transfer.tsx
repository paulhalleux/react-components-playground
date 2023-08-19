import React, { useState } from "react";
import clsx from "clsx";
import { uniq } from "lodash";

import { BaseProps } from "../../types";
import { Button } from "../Button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "../Icons";

import styles from "./Transfer.module.scss";

export type TransferItem = { id: string; label: string };
export type TransferProps = {
  /**
   * Unique identifier for the component.
   */
  id?: string;
  /**
   * Name of the component.
   */
  name?: string;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * List of items to display in the transfer.
   */
  items: TransferItem[];
  /**
   * List of selected items.
   */
  selectedItems: string[];
  /**
   * Callback when the selected items change.
   */
  onChange: (selectedItems: string[]) => void;
} & BaseProps;

export function Transfer({
  id,
  name,
  disabled,
  items,
  selectedItems,
  onChange,
  className,
  ...rest
}: TransferProps) {
  const [listSelectedItems, setListSelectedItems] = useState<string[]>([]);
  const [selectedSelectedItems, setSelectedSelectedItems] = useState<string[]>(
    [],
  );

  const onValueChange = (items: string[]) => {
    if (disabled) return;
    onChange(uniq(items));
  };

  const onItemClick = (
    selected: boolean,
    id: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;

    if (!event.ctrlKey) {
      selected ? setSelectedSelectedItems([id]) : setListSelectedItems([id]);
    } else {
      selected
        ? setSelectedSelectedItems((items) => [...items, id])
        : setListSelectedItems((items) => [...items, id]);
    }
  };

  const onKeyDown = (
    itemId: string,
    list: "selected" | "list",
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (disabled) return;

    if (event.ctrlKey && event.key === "a") {
      event.preventDefault();
      event.stopPropagation();

      if (list === "selected") {
        setSelectedSelectedItems(items.map((item) => item.id));
      }

      if (list === "list") {
        setListSelectedItems(items.map((item) => item.id));
      }
    }

    if (event.key === "Enter" && !event.ctrlKey) {
      if (list === "selected") {
        setSelectedSelectedItems((prevState) =>
          prevState.filter((item) => item !== itemId),
        );
        onValueChange(selectedItems.filter((item) => item !== itemId));
      } else {
        setListSelectedItems((prevState) =>
          prevState.filter((item) => item !== itemId),
        );
        onValueChange([...selectedItems, itemId]);
      }
    } else if (event.key === "Enter" && event.ctrlKey) {
      if (list === "selected") {
        onValueChange(
          selectedItems.filter((item) => !selectedSelectedItems.includes(item)),
        );
        setSelectedSelectedItems([]);
      } else {
        onValueChange([...selectedItems, ...listSelectedItems]);
        setListSelectedItems([]);
      }
    }
  };

  return (
    <div
      className={clsx(
        styles.transfer__container,
        {
          [styles["transfer__container--disabled"]]: disabled,
        },
        className,
      )}
      {...rest}
    >
      <input
        readOnly
        type="hidden"
        id={id}
        name={name}
        value={selectedItems.join(",")}
      />
      <div className={styles.transfer__list}>
        {items
          .filter((item) => !selectedItems.includes(item.id))
          .map((item) => (
            <div
              data-item={item.id}
              role="button"
              className={clsx(styles.transfer__item, {
                [styles["transfer__item--selected"]]:
                  listSelectedItems.includes(item.id),
              })}
              key={item.id}
              tabIndex={0}
              onClick={(event) => onItemClick(false, item.id, event)}
              onKeyDown={(event) => onKeyDown(item.id, "list", event)}
            >
              {item.label}
            </div>
          ))}
      </div>
      <div className={styles.transfer__controls}>
        <Button.Icon
          size="small"
          icon={ChevronRightIcon}
          disabled={disabled}
          onClick={() => {
            onValueChange([...selectedItems, ...listSelectedItems]);
            setListSelectedItems([]);
          }}
        />
        <Button.Icon
          size="small"
          icon={ChevronsRightIcon}
          disabled={disabled}
          onClick={() => {
            onValueChange(items.map((item) => item.id));
            setListSelectedItems([]);
            setSelectedSelectedItems([]);
          }}
        />
        <Button.Icon
          size="small"
          icon={ChevronsLeftIcon}
          disabled={disabled}
          onClick={() => {
            onValueChange([]);
            setListSelectedItems([]);
            setSelectedSelectedItems([]);
          }}
        />
        <Button.Icon
          size="small"
          icon={ChevronLeftIcon}
          disabled={disabled}
          onClick={() => {
            onValueChange(
              selectedItems.filter(
                (item) => !selectedSelectedItems.includes(item),
              ),
            );
            setSelectedSelectedItems([]);
          }}
        />
      </div>
      <div className={styles.transfer__list}>
        {items
          .filter((item) => selectedItems.includes(item.id))
          .map((item) => (
            <div
              data-item={item.id}
              role="button"
              className={clsx(styles.transfer__item, {
                [styles["transfer__item--selected"]]:
                  selectedSelectedItems.includes(item.id),
              })}
              key={item.id}
              tabIndex={0}
              onClick={(event) => onItemClick(true, item.id, event)}
              onKeyDown={(event) => onKeyDown(item.id, "selected", event)}
            >
              {item.label}
            </div>
          ))}
      </div>
    </div>
  );
}
