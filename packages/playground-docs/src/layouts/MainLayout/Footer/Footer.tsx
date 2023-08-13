import { Anchor } from "@paulhalleux/react-playground";

import { Container } from "../../../components";

import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <Container
      wrapped
      as="footer"
      wrapperClassName={styles.footer__container}
      className={styles.footer}
    >
      <p>&copy; {new Date().getFullYear()} Paul HALLEUX</p>
      <p>
        <span>Visit </span>
        <Anchor
          underline
          to="https://github.com/paulhalleux/react-playground"
          target="_blank"
        >
          GitHub
        </Anchor>
        <span> repository</span>
      </p>
    </Container>
  );
}
