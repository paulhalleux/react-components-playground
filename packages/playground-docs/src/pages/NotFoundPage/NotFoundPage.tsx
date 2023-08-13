import React from "react";

import { NotFoundState } from "../../components/NotFoundState";

import styles from "./NotFoundPage.module.scss";

export function NotFoundPage() {
  return (
    <div className={styles["not-found__container"]}>
      <NotFoundState />
    </div>
  );
}
