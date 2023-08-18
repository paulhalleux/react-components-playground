import { Badge } from "@paulhalleux/react-playground";
import clsx from "clsx";

import { Sidebar } from "../../components/Sidebar";

import styles from "./DocumentationLayout.module.scss";

export type DocumentationSidebarItem = {
  title: string;
  path: string;
  disabled?: boolean;
};

export type DocumentationSidebarGroup = {
  title: string;
  items: DocumentationSidebarItem[];
};

type DocumentationSidebarProps = {
  view: "mobile" | "desktop";
  sidebarItems: (DocumentationSidebarGroup | DocumentationSidebarItem)[];
  onItemSelect?: () => void;
};

export function DocumentationSidebar({
  sidebarItems,
  view,
  onItemSelect,
}: DocumentationSidebarProps) {
  return (
    <Sidebar
      className={clsx(styles.sidebar, styles[`sidebar--${view}`])}
      contentClassName={styles.sidebar__content}
    >
      {sidebarItems.map((item) => {
        if ("path" in item) {
          return (
            <Sidebar.Item key={item.path} path={item.path}>
              {item.title}
              {item.disabled && <Badge size="small">Planned</Badge>}
            </Sidebar.Item>
          );
        }

        return (
          <Sidebar.Group key={item.title} title={item.title}>
            {item.items.map((item) => (
              <Sidebar.Item
                key={item.path}
                path={item.path}
                disabled={item.disabled}
                onClick={onItemSelect}
              >
                {item.title}
                {item.disabled && <Badge size="small">Planned</Badge>}
              </Sidebar.Item>
            ))}
          </Sidebar.Group>
        );
      })}
    </Sidebar>
  );
}
