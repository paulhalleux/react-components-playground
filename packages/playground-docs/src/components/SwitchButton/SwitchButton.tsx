import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@paulhalleux/react-playground";
import clsx from "clsx";

import { DocumentationPage } from "@/generated";

import styles from "./SwitchButton.module.scss";

type SwitchButtonProps = {
  position: "left" | "right";
  page?: DocumentationPage;
  path?: string;
};

export function SwitchButton({ position, page, path }: SwitchButtonProps) {
  return (
    <Link
      className={clsx(styles["switch-button"], {
        [styles.disabled]: !page,
        [styles["switch-button--align-right"]]: position === "left",
      })}
      to={page && path ? path : "#"}
    >
      {position === "left" && <Icon name="arrow-left" />}

      <div className={styles.content}>
        <span className={styles.title}>
          {position === "left" ? "Previous" : "Next"}
        </span>
        <span className={styles.documentation}>{page?.title}</span>
      </div>
      {position === "right" && <Icon name="arrow-right" />}
    </Link>
  );
}
