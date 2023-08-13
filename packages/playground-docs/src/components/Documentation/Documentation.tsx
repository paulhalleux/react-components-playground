import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Badge, Breadcrumb, GithubIcon } from "@paulhalleux/react-playground";
import { AnimatePresence, motion } from "framer-motion";
import kebabCase from "lodash/kebabCase";

import { Components } from "../../../docs/__generated__";
import { DocumentationPage } from "../../types/documentation";
import { ContentTable, ContentTableItem } from "../ContentTable";
import { Markdown } from "../Markdown";
import { ApiType } from "../Mdx/ApiType/ApiType";
import { NotFoundState } from "../NotFoundState";
import { SwitchButton } from "../SwitchButton";

import styles from "./Documentation.module.scss";

type DocumentationProps = {
  type: string;
  page?: DocumentationPage;
  previousPage?: DocumentationPage;
  nextPage?: DocumentationPage;
  getRoute: (page: DocumentationPage) => string;
};

export function Documentation({
  type,
  nextPage,
  previousPage,
  page,
  getRoute,
}: DocumentationProps) {
  const mdxContainer = useRef<HTMLDivElement>(null);
  const [tableItems, setTableItems] = useState<ContentTableItem[]>();
  // const { pathname } = useLocation();

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

        setTableItems([
          {
            level: 0,
            label: page?.title ?? "",
            id: kebabCase(`${page?.title}-${page?.type}`),
          },
          ...items,
        ]);
      }
    }, 500);

    return () => clearTimeout(to);
  }, [page]);

  if (!page) {
    return (
      <div className={styles["not-found"]}>
        <NotFoundState />
      </div>
    );
  }

  const MdxComponent: (props: {
    components: Record<string, any>;
  }) => JSX.Element | null = Components[page.id as keyof typeof Components];

  return (
    <div className={styles.documentation__container}>
      <Helmet title={page.title} />
      <section className={styles.documentation__content}>
        <header className={styles.documentation__header}>
          <Breadcrumb
            size="small"
            items={[{ label: type }, { label: page.title }]}
          />
          <div className={styles.documentation__title}>
            <h1
              className={styles.title}
              id={kebabCase(`${page.title}-${page.type}`)}
            >
              {page.title}
            </h1>
            {page.sourceUrl && (
              <Badge onClick={() => window.open(page.sourceUrl, "_blank")}>
                <GithubIcon width={14} height={14} />
                View source
              </Badge>
            )}
          </div>
        </header>
        <Markdown ref={mdxContainer} content={MdxComponent} />
        <footer>
          <section className={styles.documentation__footer}>
            <SwitchButton
              position="left"
              page={previousPage}
              path={previousPage ? getRoute(previousPage) : undefined}
            />
            <SwitchButton
              position="right"
              page={nextPage}
              path={nextPage ? getRoute(nextPage) : undefined}
            />
          </section>
        </footer>
      </section>
      <AnimatePresence mode="wait">
        <motion.div
          key={page.id}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.3 }}
          className={styles["content-table__container"]}
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
