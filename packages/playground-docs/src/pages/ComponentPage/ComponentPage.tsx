import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-use";
import {
  Badge,
  Breadcrumb,
  CleanIcon,
  EmptyState,
  GithubIcon,
} from "@paulhalleux/react-playground";
import { AnimatePresence, motion } from "framer-motion";
import kebabCase from "lodash/kebabCase";

import { Components } from "../../../docs/__generated__";
import { Alert, ContentTable, ContentTableItem } from "../../components";
import { mdxComponents } from "../../components/Mdx";
import { ApiType } from "../../components/Mdx/ApiType/ApiType";
import { Title } from "../../components/Mdx/Title/Title";
import { SwitchButton } from "../../components/SwitchButton";
import { FlatComponents, GroupedComponents } from "../index";

import styles from "./ComponentPage.module.scss";

export function ComponentPage() {
  const { component, group } = useParams<{
    component: string;
    group: keyof typeof GroupedComponents;
  }>();

  const mdxContainer = useRef<HTMLDivElement>(null);
  const [tableItems, setTableItems] = useState<ContentTableItem[]>();
  const { pathname } = useLocation();

  const {
    componentDefinition,
    nextComponentDefinition,
    previousComponentDefinition,
  } = useMemo(() => {
    if (!component || !group)
      return {
        componentDefinition: undefined,
        nextComponentDefinition: undefined,
        previousComponentDefinition: undefined,
      };

    const FilteredComponents = FlatComponents.filter(
      (value) => value.status !== "todo",
    );
    const componentDefinitionIndex = FilteredComponents.findIndex(
      (value) => kebabCase(value.title) === component,
    );

    const componentDefinition = FilteredComponents[componentDefinitionIndex];
    const nextComponentDefinition =
      FilteredComponents[componentDefinitionIndex + 1];
    const previousComponentDefinition =
      FilteredComponents[componentDefinitionIndex - 1];

    return {
      componentDefinition,
      nextComponentDefinition,
      previousComponentDefinition,
    };
  }, [component]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const to = setTimeout(() => {
      if (mdxContainer.current) {
        const headings =
          mdxContainer.current.querySelectorAll<HTMLHeadingElement>(
            "h1, h2, h3",
          );

        const items: ContentTableItem[] = Array.from(headings)
          .filter((heading) => !!heading.id)
          .map((heading) => {
            const type = heading.dataset.type;
            const level = parseInt(heading.tagName[1], 10);
            const label = (
              <>
                {type && <ApiType small type={type} />}
                {heading.textContent ?? ""}
              </>
            );
            const id = heading.id;
            return { level, label, id };
          });

        setTableItems(items);
      }
    }, 500);

    return () => clearTimeout(to);
  }, [component]);

  if (!componentDefinition || !group) {
    return (
      <EmptyState
        variant="ghost"
        icon={CleanIcon}
        title="Page not found"
        description="The page you are looking for does not exist."
        actions={[{ type: "link", label: "Go back home", to: "/" }]}
      />
    );
  }

  const MdxComponent: (props: {
    components: Record<string, any>;
  }) => JSX.Element | null =
    Components[componentDefinition.id as keyof typeof Components];

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
            size="small"
            items={[
              { label: GroupedComponents[group].title },
              { label: componentDefinition.title },
            ]}
          />
          <div className={styles.component__header}>
            <Title level={1}>
              <h1 id={componentDefinition.title}>
                {componentDefinition.title}
              </h1>
            </Title>
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
              <MdxComponent components={mdxComponents} />
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
          {tableItems !== undefined ? (
            <ContentTable items={tableItems} />
          ) : (
            <ContentTable.Skeleton />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
