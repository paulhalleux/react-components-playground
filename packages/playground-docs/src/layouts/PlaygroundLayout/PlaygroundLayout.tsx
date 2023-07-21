import { Outlet } from "react-router";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./PlaygroundLayout.module.scss";

type PlaygroundLayoutProps = {
  components: { name: string; path: string }[];
};

export function PlaygroundLayout({ components }: PlaygroundLayoutProps) {
  return (
    <section className={styles.playground__container}>
      <section className={styles.playground__sidebar}>
        <section className={styles.sidebar__content}>
          <div className={styles.sidebar__group}>
            <li className={styles.sidebar__group_item}>
              <NavLink
                to="/"
                className={({ isActive }) => clsx(isActive && styles.active)}
              >
                Home
              </NavLink>
            </li>
          </div>
          <div className={styles.sidebar__group}>
            <h2 className={styles.sidebar__group_title}>Components</h2>
            <ul className={styles.sidebar__group_items}>
              {components.map(({ name, path }) => (
                <li key={path} className={styles.sidebar__group_item}>
                  <NavLink
                    className={({ isActive }) =>
                      clsx(isActive && styles.active)
                    }
                    to={path}
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
      <section className={styles.playground__content}>
        <Outlet />
      </section>
    </section>
  );
}
