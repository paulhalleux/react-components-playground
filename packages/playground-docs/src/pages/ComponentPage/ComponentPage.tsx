import React, { useEffect } from "react";
import { CleanIcon } from "@paulhalleux/react-playground";

import { Components } from "../../../docs/__generated__";
import { ComponentMeta } from "../../../docs/__generated__/components";
import {
  Alert,
  Breadcrumb,
  ContentTable,
  ContentTableItem,
} from "../../components";
import { mdxComponents } from "../../components/Mdx";
import { Title } from "../../components/Mdx/Title/Title";
import { SwitchButton } from "../../components/SwitchButton";
import { ExamplesProvider } from "../../contexts/examples-context";

import styles from "./ComponentPage.module.scss";

type ComponentProps = {
  component: ComponentMeta;
  previous?: ComponentMeta;
  next?: ComponentMeta;
};

export function ComponentPage({ component, previous, next }: ComponentProps) {
  // @ts-ignore
  const MdxComponent = Components[component.fileName];
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
        <Breadcrumb items={["Component", component.title || undefined]} />
        <Title level={1}>{component.title}</Title>
        <section className={styles.mdx} ref={mdxContainer}>
          {MdxComponent ? (
            <ExamplesProvider examples={MdxComponent.Examples}>
              <MdxComponent components={mdxComponents} />
            </ExamplesProvider>
          ) : (
            <Alert icon={CleanIcon}>
              No documentation found for <code>{component.title}</code>
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
