import { Helmet } from "react-helmet";
import { Anchor, Button } from "@paulhalleux/react-playground";

import { Container } from "../../components";
import { Code } from "../../components/Mdx/Code/Code";
import { Routes } from "../../constants/routes";

import styles from "./MainPage.module.scss";

export function MainPage() {
  return (
    <Container className={styles.main__container}>
      <Helmet />
      <h1 className={styles.title}>
        Playground
        <br />
        <span>Documentation</span>
      </h1>
      <p className={styles.description}>
        <Code>Playground</Code> is a collection of React components, hooks and
        utilities developed for training purposes. The goal is to provide a set
        of components that can be used to build a simple application.
      </p>
      <section>
        <Anchor to={Routes.Components} asLink>
          <Button>Start exploring</Button>
        </Anchor>
      </section>
    </Container>
  );
}
