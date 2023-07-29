import React, { ReactNode, useRef, useState } from "react";
import clsx from "clsx";

import { useOverflow } from "../../hooks";
import { CloseButton } from "../CloseButton";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  PlusIcon,
} from "../Icons";
import { Separator } from "../Separator";

import { Tab, TabProps } from "./Tab";

import styles from "./Tabs.module.scss";

export type TabLayout = "spaced" | "compact";
export type TabOrientation = "horizontal" | "vertical";

export type TabsProps = {
  children: ReactNode;
  defaultActiveTab?: string;
  orientation?: TabOrientation;
  layout?: TabLayout;
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
  const tabsContainer = useRef<HTMLDivElement>(null);
  const { overflow, onScroll, scroll } = useOverflow(tabsContainer);

  const TabsChildren = React.Children.toArray(
    children,
  ) as React.ReactElement<TabProps>[];

  const [activeTab, setActiveTab] = useState(
    defaultActiveTab ?? TabsChildren[0].props.id,
  );

  const onScrollClick = (dir: "left" | "right") => {
    if (tabsContainer.current) {
      const { scrollLeft, scrollTop } = tabsContainer.current;

      if (orientation === "vertical") {
        tabsContainer.current.scroll({
          left: dir === "left" ? scrollLeft - 150 : scrollLeft + 150,
          behavior: "smooth",
        });
      } else {
        tabsContainer.current.scroll({
          top: dir === "left" ? scrollTop - 150 : scrollTop + 150,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div
      className={clsx(
        styles.tabs__container,
        styles[`tabs__container--${orientation}`],
        styles[`tabs__container--${layout}`],
        { [styles["tabs--addable"]]: addButton },
      )}
    >
      <div className={styles.tabs__tablist}>
        {((overflow.x && scroll.left > 0) ||
          (overflow.y && scroll.top > 0)) && (
          <div
            role="button"
            className={styles["scroll--left"]}
            onClick={() => onScrollClick("left")}
          >
            {orientation === "horizontal" ? (
              <ArrowUpIcon width={16} height={16} />
            ) : (
              <ArrowLeftIcon width={16} height={16} />
            )}
          </div>
        )}
        <div onScroll={onScroll} className={styles.tabs} ref={tabsContainer}>
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
        </div>
        {((overflow.x && scroll.left < scroll.maxLeft) ||
          (overflow.y && scroll.top < scroll.maxTop)) && (
          <div
            role="button"
            className={styles["scroll--right"]}
            onClick={() => onScrollClick("right")}
          >
            {orientation === "horizontal" ? (
              <ArrowDownIcon width={16} height={16} />
            ) : (
              <ArrowRightIcon width={16} height={16} />
            )}
          </div>
        )}
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
