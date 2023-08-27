import React from "react";

import { Icon, IconProps } from "../Icons";

import { Button, ButtonProps } from "./Button";

import styles from "./Button.module.scss";

export type IconButtonProps = ButtonProps & {
  /**
   * Icon to display
   */
  icon: IconProps["name"];
  /**
   * Size of the icon
   */
  iconSize?: number;
};

const IconSize = {
  small: 14,
  medium: 16,
  large: 24,
};

export function IconButton({ icon, iconSize, ...rest }: IconButtonProps) {
  return (
    <Button className={styles[`button--icon`]} {...rest}>
      {icon && (
        <Icon name={icon} size={iconSize ?? IconSize[rest.size ?? "medium"]} />
      )}
    </Button>
  );
}
