import React, { ReactNode, useState } from "react";
import clsx from "clsx";

import { Tab, TabProps } from "./Tab";

import styles from "./Tabs.module.scss";

export type TabsProps = {
  children: ReactNode;
  defaultActiveTab?: string;
  orientation?: "horizontal" | "vertical";
  layout?: "spaced" | "compact";
};

export function Tabs({
  children,
  defaultActiveTab,
  orientation = "vertical",
  layout = "spaced",
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
          const { id, label } = tab.props;

          return (
            <button
              key={id}
              className={clsx(styles.tabs__tab__button, {
                [styles["tabs__tab__button--active"]]: id === activeTab,
              })}
              onClick={() => setActiveTab(id)}
              aria-selected={id === activeTab}
              aria-controls={id}
            >
              {label}
            </button>
          );
        })}
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
