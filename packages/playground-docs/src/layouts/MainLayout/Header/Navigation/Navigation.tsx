import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

import { Logo } from "../../../../components";
import {
  HookDocumentations,
  UtilityDocumentations,
} from "../../../../utils/documentation";
import { getDocumentationPath } from "../../../../utils/path";

import styles from "./Navigation.module.scss";

export function Navigation() {
  return (
    <div className={styles.navigation__container}>
      <Link to="/">
        <Logo />
      </Link>
      <nav className={styles.navigation__nav}>
        <NavLink
          className={({ isActive }) =>
            clsx(styles.navigation__nav__link, isActive && styles.active)
          }
          to="/"
        >
          /
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(styles.navigation__nav__link, isActive && styles.active)
          }
          to="/components"
        >
          Components
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(styles.navigation__nav__link, isActive && styles.active)
          }
          to={`/hooks/${getDocumentationPath(
            Object.values(HookDocumentations)[0],
          )}`}
        >
          Hooks
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(styles.navigation__nav__link, isActive && styles.active)
          }
          to={`/utilities/${getDocumentationPath(
            Object.values(UtilityDocumentations)[0],
          )}`}
        >
          Utilities
        </NavLink>
      </nav>
    </div>
  );
}
