import React from "react";
import clsx from "clsx";

import styles from "./ApiType.module.scss";

type ApiTypeProps = {
  type: keyof typeof TypeMap;
  small?: boolean;
};

export function ApiType({ type, small }: ApiTypeProps) {
  const { label, color } = getType(type);
  if (!label || !color) return null;

  const style = {
    "--color": `${color.join(",")}`,
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

const TypeMap: Record<string, [string, [number, number, number]]> = {
  function: ["F", [255, 152, 0]],
  type: ["T", [33, 150, 243]],
  component: ["C", [76, 175, 80]],
};

export function getType(type: string) {
  const value = TypeMap[type.toLowerCase() as keyof typeof TypeMap];

  if (!value) return { label: null, color: null };

  return { label: value[0], color: value[1] };
}
