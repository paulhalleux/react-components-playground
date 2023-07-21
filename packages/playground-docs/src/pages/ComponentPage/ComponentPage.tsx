import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { Components } from "../../../docs/_generated";
import { ArrowLeft, ArrowRight, CleanIcon } from "../../components";
import { Alert } from "../../components/Alert/Alert";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import { mdxComponents } from "../../components/Mdx";
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

  return (
    <div className={styles.component__container}>
      <header className={styles.component__header}>
        <Breadcrumb items={["Component", component.name]} />
      </header>
      <section className={styles.component__content}>
        {MdxComponent ? (
          <MdxComponent components={mdxComponents} />
        ) : (
          <Alert icon={CleanIcon}>
            No documentation found for <code>{component.name}</code>
          </Alert>
        )}
      </section>
      <section className={styles.component__footer}>
        <Link
          className={clsx(
            styles["switch-button"],
            styles["switch-button--align-right"],
            { [styles.disabled]: !previous },
          )}
          to={previous?.path ?? ""}
        >
          <ArrowLeft />
          <div className={styles.content}>
            <span className={styles.title}>Previous</span>
            <span className={styles.component}>{previous?.name}</span>
          </div>
        </Link>
        <Link
          className={clsx(styles["switch-button"], {
            [styles.disabled]: !next,
          })}
          to={next?.path ?? ""}
        >
          <div className={styles.content}>
            <span className={styles.title}>Next</span>
            <span className={styles.component}>{next?.name}</span>
          </div>
          <ArrowRight />
        </Link>
      </section>
    </div>
  );
}
