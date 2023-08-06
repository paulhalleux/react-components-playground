import React from "react";

import { IconProps } from "../Icons";

import { Button, ButtonProps } from "./Button";

import styles from "./Button.module.scss";

export type IconButtonProps = ButtonProps & {
  /**
   * Icon to display
   */
  icon: React.FC<IconProps>;
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

export function IconButton({ icon: Icon, iconSize, ...rest }: IconButtonProps) {
  return (
    <Button className={styles[`button--icon`]} {...rest}>
      {Icon && (
        <Icon
          width={iconSize ?? IconSize[rest.size ?? "medium"]}
          height={iconSize ?? IconSize[rest.size ?? "medium"]}
        />
      )}
    </Button>
  );
}
