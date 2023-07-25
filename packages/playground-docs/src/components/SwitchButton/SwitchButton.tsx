import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@paulhalleux/react-playground";
import clsx from "clsx";

import { ComponentMeta } from "../../../docs/__generated__/components";
import { getComponentPath } from "../../utils/path";

import styles from "./SwitchButton.module.scss";

type SwitchButtonProps = {
  position: "left" | "right";
  component?: ComponentMeta;
};

export function SwitchButton({ position, component }: SwitchButtonProps) {
  return (
    <Link
      className={clsx(styles["switch-button"], {
        [styles.disabled]: !component,
        [styles["switch-button--align-right"]]: position === "left",
      })}
      to={
        component
          ? `/components/${
              component.path || getComponentPath(component?.title)
            }`
          : "#"
      }
    >
      {position === "left" && <ArrowLeftIcon />}
      <div className={styles.content}>
        <span className={styles.title}>
          {position === "left" ? "Previous" : "Next"}
        </span>
        <span className={styles.component}>{component?.title}</span>
      </div>
      {position === "right" && <ArrowRightIcon />}
    </Link>
  );
}
