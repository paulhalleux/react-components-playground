import React from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  Badge,
  Button,
  Drawer,
  GithubFillIcon,
  Header,
  MoonIcon,
  Navigation,
  SidebarIcon,
  SunIcon,
  Text,
  useTheme,
  WindowSize,
} from "@paulhalleux/react-playground";

import { Logo } from "../../../components";
import { Sidebar } from "../../../components/Sidebar";
import { SidebarGroup } from "../../../components/Sidebar/SidebarGroup";
import { Routes } from "../../../constants/routes";
import {
  ComponentDocumentations,
  HookDocumentations,
  UtilityDocumentations,
} from "../../../utils/documentation";

export function MainHeader() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const onThemeChange = () => {
    if (theme === "Dark") {
      setTheme("Light");
    } else {
      setTheme("Dark");
    }
  };

  return (
    <Header
      containerWidth={1400}
      containerPadding={24}
      layout="2-column"
      sticky
    >
      <Header.Logo>
        <Link to="/">
          <Logo />
        </Link>
      </Header.Logo>
      <WindowSize minWidth={768}>
        <Header.Navigation>
          <Navigation.Link asLink href="/">
            /
          </Navigation.Link>
          <Navigation.Link asLink href="/components">
            Components
            <Badge size="small">
              {
                Object.values(ComponentDocumentations).filter(
                  (v) => v.status !== "todo",
                ).length
              }
            </Badge>
          </Navigation.Link>
          <Navigation.Link
            asLink
            href={Routes.getHookRoute(Object.values(HookDocumentations)[0])}
          >
            Hooks
            <Badge size="small">
              {
                Object.values(HookDocumentations).filter(
                  (v) => v.status !== "todo",
                ).length
              }
            </Badge>
          </Navigation.Link>
          <Navigation.Link
            asLink
            href={Routes.getUtilityRoute(
              Object.values(UtilityDocumentations)[0],
            )}
          >
            Utilities
            <Badge size="small">
              {
                Object.values(UtilityDocumentations).filter(
                  (v) => v.status !== "todo",
                ).length
              }
            </Badge>
          </Navigation.Link>
        </Header.Navigation>
      </WindowSize>
      <Header.Actions>
        <Anchor
          variant="secondary"
          to="https://github.com/paulhalleux/react-playground"
          target="_blank"
        >
          <GithubFillIcon size={20} />
        </Anchor>
        <Button.Icon
          onClick={onThemeChange}
          ghost
          icon={theme === "Light" ? MoonIcon : SunIcon}
          iconSize={20}
        />
        <WindowSize maxWidth={768}>
          <Button.Icon
            icon={SidebarIcon}
            iconSize={20}
            onClick={() => setSidebarOpen(true)}
          />
          <Drawer open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
            <Drawer.Header closeable>
              <Text type="h4">Playground</Text>
            </Drawer.Header>
            <Drawer.Body>
              <Sidebar>
                <SidebarGroup>
                  <Sidebar.Item onClick={() => setSidebarOpen(false)} path="/">
                    Home
                  </Sidebar.Item>
                  <Sidebar.Item
                    onClick={() => setSidebarOpen(false)}
                    path="/components"
                  >
                    Components
                  </Sidebar.Item>
                  <Sidebar.Item
                    onClick={() => setSidebarOpen(false)}
                    path={Routes.getHookRoute(
                      Object.values(HookDocumentations)[0],
                    )}
                  >
                    Hooks
                  </Sidebar.Item>
                  <Sidebar.Item
                    onClick={() => setSidebarOpen(false)}
                    path={Routes.getUtilityRoute(
                      Object.values(UtilityDocumentations)[0],
                    )}
                  >
                    Utilities
                  </Sidebar.Item>
                </SidebarGroup>
              </Sidebar>
            </Drawer.Body>
          </Drawer>
        </WindowSize>
      </Header.Actions>
    </Header>
  );
}
