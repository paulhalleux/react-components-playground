import { Link } from "react-router-dom";
import {
  Anchor,
  Badge,
  Button,
  GithubFillIcon,
  Header,
  MoonIcon,
  Navigation,
  SunIcon,
  ThemeType,
  useTheme,
} from "@paulhalleux/react-playground";

import { Logo } from "../../../components";
import { Routes } from "../../../constants/routes";
import {
  ComponentDocumentations,
  HookDocumentations,
  UtilityDocumentations,
} from "../../../utils/documentation";

export function MainHeader() {
  const { theme, setTheme } = useTheme();

  const onThemeChange = () => {
    if (theme === ThemeType.Dark) {
      setTheme(ThemeType.Light);
    } else {
      setTheme(ThemeType.Dark);
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
          href={Routes.getUtilityRoute(Object.values(UtilityDocumentations)[0])}
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
          icon={theme === ThemeType.Light ? MoonIcon : SunIcon}
          iconSize={20}
        />
      </Header.Actions>
    </Header>
  );
}
