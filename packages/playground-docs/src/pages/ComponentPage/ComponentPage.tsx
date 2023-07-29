import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-use";
import { Badge, CleanIcon, GithubIcon } from "@paulhalleux/react-playground";
import { AnimatePresence, motion } from "framer-motion";

import { Components } from "../../../docs/__generated__";
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
import { getComponentPath } from "../../utils/path";
import { SortedComponents } from "../index";

import styles from "./ComponentPage.module.scss";

export function ComponentPage() {
  const { component } = useParams<{ component: string }>();

  const {
    componentDefinition,
    nextComponentDefinition,
    previousComponentDefinition,
  } = useMemo(() => {
    const componentDefinitionIndex = SortedComponents.findIndex(
      (value) => getComponentPath(value) === component,
    );

    const componentDefinition = SortedComponents[componentDefinitionIndex];
    const nextComponentDefinition =
      SortedComponents[componentDefinitionIndex + 1];
    const previousComponentDefinition =
      SortedComponents[componentDefinitionIndex - 1];

    return {
      componentDefinition,
      nextComponentDefinition,
      previousComponentDefinition,
    };
  }, [component]);

  // @ts-ignore
  const MdxComponent = Components[componentDefinition.fileName];
  const mdxContainer = React.useRef<HTMLDivElement>(null);
  const [tableItems, setTableItems] = React.useState<ContentTableItem[]>([]);

  const { pathname } = useLocation();

  useEffect(() => {
    const to = setTimeout(() => {
      if (mdxContainer.current) {
        const headings =
          mdxContainer.current.querySelectorAll<HTMLHeadingElement>(
            "h1, h2, h3, h4, h5, h6",
          );

        const items: ContentTableItem[] = Array.from(headings)
          .filter((heading) => !!heading.id)
          .map((heading) => {
            const level = parseInt(heading.tagName[1], 10);
            const name = heading.textContent ?? "";
            const id = heading.id;
            return { level, name, id };
          });

        setTableItems(items);
      }
    }, 300);

    return () => clearTimeout(to);
  }, [component]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [component]);

  if (!componentDefinition) {
    return null;
  }

  return (
    <div className={styles.component__container}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.component__content}
        >
          <Breadcrumb
            items={["Component", componentDefinition.title || undefined]}
          />
          <div className={styles.component__header}>
            <Title level={1}>{componentDefinition.title}</Title>
            {componentDefinition.sourceUrl && (
              <Badge
                onClick={() =>
                  window.open(componentDefinition.sourceUrl, "_blank")
                }
              >
                <GithubIcon width={14} height={14} />
                View source
              </Badge>
            )}
          </div>
          <section className={styles.mdx} ref={mdxContainer}>
            {MdxComponent ? (
              <ExamplesProvider examples={MdxComponent.Examples}>
                <MdxComponent components={mdxComponents} />
              </ExamplesProvider>
            ) : (
              <Alert icon={CleanIcon}>
                No documentation found for{" "}
                <code>{componentDefinition.title}</code>
              </Alert>
            )}
          </section>
          <section className={styles.switch__navigation}>
            <SwitchButton
              position="left"
              component={previousComponentDefinition}
            />
            <SwitchButton
              position="right"
              component={nextComponentDefinition}
            />
          </section>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={component}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.3 }}
          className={styles.component__content_table}
        >
          {tableItems.length ? (
            <ContentTable items={tableItems} />
          ) : (
            <ContentTable.Skeleton />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
