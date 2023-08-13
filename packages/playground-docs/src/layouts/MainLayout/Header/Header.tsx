import { Container } from "../../../components";

import { HeaderActions } from "./HeaderActions";
import { Navigation } from "./Navigation";

import styles from "./Header.module.scss";

export function Header() {
  return (
    <Container
      wrapped
      as="header"
      wrapperClassName={styles.header__container}
      className={styles.header}
    >
      <Navigation />
      <HeaderActions />
    </Container>
  );
}
