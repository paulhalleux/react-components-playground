import React from "react";
import {
  Button,
  Drawer,
  SidebarIcon,
  Text,
  WindowSize,
} from "@paulhalleux/react-playground";

import {
  DocumentationSidebar,
  DocumentationSidebarGroup,
  DocumentationSidebarItem,
} from "../../layouts/DocumentationLayout/DocumentationSidebar";

import styles from "./Documentation.module.scss";

type SidebarTriggerProps = {
  sidebarItems: (DocumentationSidebarItem | DocumentationSidebarGroup)[];
};

export function SidebarTrigger({ sidebarItems }: SidebarTriggerProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <WindowSize maxWidth={768}>
      <Button.Icon onClick={() => setSidebarOpen(true)} icon={SidebarIcon} />
      <Drawer
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        position="left"
        size="small"
      >
        <Drawer.Header closeable className={styles.sidebar__header}>
          <Text type="h4">Documentation</Text>
        </Drawer.Header>
        <DocumentationSidebar
          view="mobile"
          sidebarItems={sidebarItems}
          onItemSelect={() => setSidebarOpen(false)}
        />
      </Drawer>
    </WindowSize>
  );
}
