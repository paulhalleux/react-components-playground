import { Outlet } from "react-router";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

import Logo from "../../../assets/logo.png";
import {
  Anchor,
  Container,
  GithubIcon,
  KeyboardShortcut,
  Search,
} from "../../components";
import { Component } from "../../types/component";

import styles from "./MainLayout.module.scss";

type MainLayoutProps = {
  components: Component[];
};

export function MainLayout({ components }: MainLayoutProps) {
  return (
    <main className={styles.layout}>
      <Container
        as="header"
        containerClassName={styles.layout__header__container}
        className={styles.layout__header}
      >
        <div className={styles.layout__header__nav}>
          <Link to="/">
            <img src={Logo} alt="Logo" className={styles.logo} />
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
          <Search
            placeholder="Search component..."
            addon={(input) => (
              <KeyboardShortcut
                shortcut="ctrl+k"
                onShortcut={() => input.current?.focus()}
              />
            )}
            autocompleteItems={components.map((component) => ({
              ...component,
              id: component.name,
            }))}
            renderAutocompleteItem={(component, className) => (
              <Link
                to={component.path}
                className={clsx(styles.search__item, className)}
              >
                <component.icon width={12} height={12} />
                {component.name}
              </Link>
            )}
          />
          <Anchor
            href="https://github.com/paulhalleux/react-playground"
            target="_blank"
          >
            <GithubIcon height={20} width={20} />
          </Anchor>
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
