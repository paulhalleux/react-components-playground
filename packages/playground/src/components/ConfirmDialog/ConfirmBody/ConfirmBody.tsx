import React from "react";

import { Icon, IconProps } from "../../Icons";

import styles from "../ConfirmDialog.module.scss";

type ConfirmBodyProps = {
  icon?: IconProps["name"];
  title: string;
  description?: string;
};

export function ConfirmBody({ icon, title, description }: ConfirmBodyProps) {
  return (
    <>
      {icon && (
        <div className={styles.confirm__icon}>
          <Icon name={icon} size={24} />
        </div>
      )}
      <h2 className={styles.confirm__title}>{title}</h2>
      <p className={styles.confirm__description}>{description}</p>
    </>
  );
}
