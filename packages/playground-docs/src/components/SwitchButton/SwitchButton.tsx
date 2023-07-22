import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { Component } from "../../types/component";
import { ArrowLeftIcon, ArrowRightIcon } from "../Icons";

import styles from "./SwitchButton.module.scss";

type SwitchButtonProps = {
  position: "left" | "right";
  component?: Component;
};

export function SwitchButton({ position, component }: SwitchButtonProps) {
  return (
    <Link
      className={clsx(styles["switch-button"], {
        [styles.disabled]: !component,
        [styles["switch-button--align-right"]]: position === "left",
      })}
      to={component?.path ?? ""}
    >
      {position === "left" && <ArrowLeftIcon />}
      <div className={styles.content}>
        <span className={styles.title}>
          {position === "left" ? "Previous" : "Next"}
        </span>
        <span className={styles.component}>{component?.name}</span>
      </div>
      {position === "right" && <ArrowRightIcon />}
    </Link>
  );
}
