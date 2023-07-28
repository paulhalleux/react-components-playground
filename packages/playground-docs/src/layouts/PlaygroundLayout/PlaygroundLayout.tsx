import React from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { ComponentList } from "../../../docs/__generated__/components";
import { groupComponents } from "../../utils/components";

import { SidebarGroup } from "./SidebarGroup";

import styles from "./PlaygroundLayout.module.scss";

export function PlaygroundLayout() {
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
          {Object.entries(groupComponents(ComponentList)).map(
            ([group, components]) => (
              <SidebarGroup title={group} components={components} key={group} />
            ),
          )}
        </section>
      </section>
      <Outlet />
    </section>
  );
}
