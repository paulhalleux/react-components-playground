import { JSX, PropsWithChildren } from "react";
import kebab from "lodash/kebabCase";

import { Button } from "../../Button";
import { LinkIcon } from "../../Icons";

import styles from "./Title.module.scss";

type TitleProps = PropsWithChildren<{
  level: number;
}>;

export function Title({ level, children }: TitleProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const id = kebab(children?.toString());

  const onLinkClick = () => {
    navigator.clipboard.writeText(window.location.href + "#" + id);
  };

  return (
    <Tag id={id} className={styles[`heading__h${level}`]}>
      <Button
        icon
        onClick={onLinkClick}
        variant="ghost"
        className={styles.link__button}
      >
        <LinkIcon />
      </Button>
      {children}
    </Tag>
  );
}
