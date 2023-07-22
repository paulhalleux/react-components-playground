import { Outlet } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { GithubIcon, MoonIcon, SunIcon } from "@paulhalleux/react-playground";
import clsx from "clsx";

import { Anchor, Button, Container, Logo } from "../../components";
import { ThemeType, useTheme } from "../../contexts/theme-context";
import { Component } from "../../types/component";

import { ComponentSearch } from "./ComponentSearch";

import styles from "./MainLayout.module.scss";

type MainLayoutProps = {
  components: Component[];
};

export function MainLayout({ components }: MainLayoutProps) {
  const { theme, setTheme } = useTheme();

  const onThemeChange = () => {
    if (theme === ThemeType.Dark) {
      setTheme(ThemeType.Light);
    } else {
      setTheme(ThemeType.Dark);
    }
  };

  return (
    <main className={styles.layout}>
      <Container
        as="header"
        containerClassName={styles.layout__header__container}
        className={styles.layout__header}
      >
        <div className={styles.layout__header__nav}>
          <Link to="/">
            <Logo />
          </Link>
          <nav className={styles.layout__header__nav__links}>
            <NavLink
              className={({ isActive }) =>
                clsx(
                  styles.layout__header__nav__link,
                  isActive && styles.active,
                )
              }
              to="/"
            >
              Components
            </NavLink>
          </nav>
        </div>
        <div className={styles.layout__header__actions}>
          <ComponentSearch components={components} />
          <Anchor
            href="https://github.com/paulhalleux/react-playground"
            target="_blank"
          >
            <GithubIcon height={20} width={20} />
          </Anchor>
          <Button onClick={onThemeChange} variant="ghost" icon>
            {theme === ThemeType.Light ? (
              <MoonIcon height={20} width={20} />
            ) : (
              <SunIcon height={20} width={20} />
            )}
          </Button>
        </div>
      </Container>
      <Container as="section" containerClassName={styles.layout__content}>
        <Outlet />
      </Container>
      <Container
        as="footer"
        containerClassName={styles.layout__footer__container}
        className={styles.layout__footer}
      >
        <p>&copy; {new Date().getFullYear()} Paul HALLEUX</p>
        <p>
          Visit{" "}
          <Anchor
            href="https://github.com/paulhalleux/react-playground"
            target="_blank"
          >
            GitHub
          </Anchor>{" "}
          repository
        </p>
      </Container>
    </main>
  );
}
