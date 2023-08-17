import React from "react";
import {
  ThemeConfigurationColors,
  useTheme,
} from "@paulhalleux/react-playground";
import clsx from "clsx";

import styles from "./ApiType.module.scss";

type ApiTypeProps = {
  type: keyof typeof TypeMap;
  small?: boolean;
};

export function ApiType({ type, small }: ApiTypeProps) {
  const { currentConfiguration } = useTheme();
  const { label, color } = getType(type);
  if (!label || !color) return null;

  const style = {
    "--color": `${currentConfiguration!.colors![
      color as keyof ThemeConfigurationColors
    ]?.join(",")}`,
  } as React.CSSProperties;

  return (
    <span
      style={style}
      className={clsx(styles["api-type"], {
        [styles["api-type--small"]]: small,
      })}
    >
      {label}
    </span>
  );
}

const TypeMap: Record<string, [string, string]> = {
  function: ["F", "warning"],
  type: ["T", "primary"],
  component: ["C", "success"],
};

export function getType(type: string) {
  const value = TypeMap[type.toLowerCase() as keyof typeof TypeMap];

  if (!value) return { label: null, color: null };

  return { label: value[0], color: value[1] };
}
