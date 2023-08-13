import { PropsWithChildren } from "react";
import { Badge } from "@paulhalleux/react-playground";

import { Container } from "../../components";
import { Sidebar } from "../../components/Sidebar";

import styles from "./DocumentationLayout.module.scss";

type SidebarItem = {
  title: string;
  path: string;
  disabled?: boolean;
};

type SidebarGroup = {
  title: string;
  items: SidebarItem[];
};

type DocumentationLayoutProps = PropsWithChildren<{
  sidebarItems: (SidebarGroup | SidebarItem)[];
}>;

export function DocumentationLayout({
  sidebarItems,
  children,
}: DocumentationLayoutProps) {
  return (
    <Container as="section" className={styles.container}>
      <Sidebar
        className={styles.sidebar}
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
                >
                  {item.title}
                  {item.disabled && <Badge size="small">Planned</Badge>}
                </Sidebar.Item>
              ))}
            </Sidebar.Group>
          );
        })}
      </Sidebar>
      {children}
    </Container>
  );
}
