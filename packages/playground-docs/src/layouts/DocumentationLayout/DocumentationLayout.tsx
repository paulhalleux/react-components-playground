import { PropsWithChildren } from "react";
import { WindowSize } from "@paulhalleux/react-playground";

import { Container } from "../../components";

import {
  DocumentationSidebar,
  DocumentationSidebarGroup,
  DocumentationSidebarItem,
} from "./DocumentationSidebar";

import styles from "./DocumentationLayout.module.scss";

type DocumentationLayoutProps = PropsWithChildren<{
  sidebarItems: (DocumentationSidebarGroup | DocumentationSidebarItem)[];
}>;

export function DocumentationLayout({
  sidebarItems,
  children,
}: DocumentationLayoutProps) {
  return (
    <Container as="section" className={styles.container}>
      <WindowSize minWidth={768}>
        <DocumentationSidebar view="desktop" sidebarItems={sidebarItems} />
      </WindowSize>
      {children}
    </Container>
  );
}
