import React from "react";

import { IconProps } from "../../Icons";

import styles from "../ConfirmDialog.module.scss";

type ConfirmBodyProps = {
  icon?: React.FC<IconProps>;
  title: string;
  description?: string;
};

export function ConfirmBody({
  icon: Icon,
  title,
  description,
}: ConfirmBodyProps) {
  return (
    <>
      {Icon && (
        <div className={styles.confirm__icon}>
          <Icon size={24} />
        </div>
      )}
      <h2 className={styles.confirm__title}>{title}</h2>
      <p className={styles.confirm__description}>{description}</p>
    </>
  );
}
