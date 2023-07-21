import React, { PropsWithChildren } from "react";

import styles from "./Anchor.module.scss";
type AnchorProps = PropsWithChildren<{
  href: string;
}> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Anchor({ href, children, ...rest }: AnchorProps) {
  return (
    <a className={styles.anchor} href={href} {...rest}>
      {children}
    </a>
  );
}
