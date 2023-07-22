import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { Badge } from "@paulhalleux/react-playground";
import clsx from "clsx";

import { Component } from "../../types/component";

import styles from "./PlaygroundLayout.module.scss";

type PlaygroundLayoutProps = {
  components: Component[];
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
              {components.map(({ name, path, status }) => (
                <li key={path} className={styles.sidebar__group_item}>
                  <NavLink
                    className={({ isActive }) =>
                      clsx(isActive && styles.active)
                    }
                    to={path}
                  >
                    {name}
                  </NavLink>
                  {status !== "done" && <Badge size="small">{status}</Badge>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
      <Outlet />
    </section>
  );
}
