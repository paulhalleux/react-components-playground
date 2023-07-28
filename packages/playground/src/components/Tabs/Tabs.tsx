import React, { ReactNode, useState } from "react";
import clsx from "clsx";

import { CloseButton } from "../CloseButton";
import { PlusIcon } from "../Icons";
import { Separator } from "../Separator";

import { Tab, TabProps } from "./Tab";

import styles from "./Tabs.module.scss";

export type TabsProps = {
  children: ReactNode;
  defaultActiveTab?: string;
  orientation?: "horizontal" | "vertical";
  layout?: "spaced" | "compact";
  renderLabel?: (label: string) => ReactNode;
  addButton?: boolean;
  onAdd?: () => void;
  addButtonLabel?: string;
  addDisabled?: boolean;
};

export function Tabs({
  children,
  defaultActiveTab,
  orientation = "vertical",
  layout = "spaced",
  renderLabel = (label: string) => label,
  onAdd,
  addButton,
  addDisabled,
  addButtonLabel = "Add tab",
}: TabsProps) {
  const TabsChildren = React.Children.toArray(
    children,
  ) as React.ReactElement<TabProps>[];

  const [activeTab, setActiveTab] = useState(
    defaultActiveTab ?? TabsChildren[0].props.id,
  );

  return (
    <div
      className={clsx(
        styles.tabs__container,
        styles[`tabs__container--${orientation}`],
        styles[`tabs__container--${layout}`],
      )}
    >
      <div className={styles.tabs__tablist}>
        {TabsChildren.map((tab) => {
          const { id, label, disabled, closeDisabled, onClose, closeable } =
            tab.props;

          return (
            <div
              role="button"
              key={id}
              className={clsx(styles.tabs__tab__button, {
                [styles["tabs__tab__button--active"]]: id === activeTab,
                [styles["tabs__tab__button--disabled"]]: disabled,
              })}
              onClick={() => !disabled && setActiveTab(id)}
              aria-selected={id === activeTab}
              aria-controls={id}
            >
              {renderLabel(label)}
              {closeable && (
                <CloseButton
                  size="medium"
                  onClick={onClose}
                  disabled={closeDisabled || disabled}
                  variant="ghost"
                />
              )}
            </div>
          );
        })}
        {addButton && (
          <>
            <Separator orientation={orientation} />
            <button
              onClick={onAdd}
              disabled={addDisabled}
              className={clsx(
                styles.tabs__tab__button,
                styles.tabs__tab__button_add,
              )}
            >
              <PlusIcon width={15} height={15} />
              {orientation === "horizontal" && addButtonLabel}
            </button>
          </>
        )}
      </div>
      <div className={styles.tab__pane__container}>
        {TabsChildren.map((tab) => (
          <div
            className={clsx(styles.tab__container, {
              [styles["tabs__tab--active"]]: tab.props.id === activeTab,
            })}
            key={tab.props.id}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
}

Tabs.Tab = Tab;
