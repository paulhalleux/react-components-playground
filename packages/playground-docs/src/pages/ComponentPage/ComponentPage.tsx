import React, { useEffect } from "react";

import { Components } from "../../../docs/_generated";
import {
  Alert,
  Breadcrumb,
  CleanIcon,
  ContentTable,
  ContentTableItem,
} from "../../components";
import { mdxComponents } from "../../components/Mdx";
import { SwitchButton } from "../../components/SwitchButton";
import { Component as ComponentType } from "../../types/component";

import styles from "./ComponentPage.module.scss";

type ComponentProps = {
  component: ComponentType;
  previous?: ComponentType;
  next?: ComponentType;
};

export function ComponentPage({ component, previous, next }: ComponentProps) {
  // @ts-ignore
  const MdxComponent = Components[component.name];
  const mdxContainer = React.useRef<HTMLDivElement>(null);
  const [tableItems, setTableItems] = React.useState<ContentTableItem[]>([]);

  useEffect(() => {
    if (mdxContainer.current) {
      const headings =
        mdxContainer.current.querySelectorAll<HTMLHeadingElement>(
          "h1, h2, h3, h4, h5, h6",
        );

      const items: ContentTableItem[] = Array.from(headings).map((heading) => {
        const level = parseInt(heading.tagName[1], 10);
        const name = heading.textContent ?? "";
        const id = heading.id;
        return { level, name, id };
      });

      setTableItems(items);
    }
  }, [component]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [component]);

  return (
    <div className={styles.component__container}>
      <div className={styles.component__content}>
        <Breadcrumb items={["Component", component.name]} />
        <section className={styles.mdx} ref={mdxContainer}>
          {MdxComponent ? (
            <MdxComponent components={mdxComponents} />
          ) : (
            <Alert icon={CleanIcon}>
              No documentation found for <code>{component.name}</code>
            </Alert>
          )}
        </section>
        <section className={styles.switch__navigation}>
          <SwitchButton position="left" component={previous} />
          <SwitchButton position="right" component={next} />
        </section>
      </div>
      <div className={styles.component__content_table}>
        <ContentTable items={tableItems} />
      </div>
    </div>
  );
}
