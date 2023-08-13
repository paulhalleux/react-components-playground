import { PropsWithChildren } from "react";

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
