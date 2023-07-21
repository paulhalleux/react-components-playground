import { Outlet } from "react-router";
import { Link } from "react-router-dom";

import Logo from "../../../assets/logo.png";
import {
  Anchor,
  Container,
  GithubIcon,
  KeyboardShortcut,
  Search,
} from "../../components";

import styles from "./MainLayout.module.scss";

export function MainLayout() {
  return (
    <main className={styles.layout}>
      <Container
        as="header"
        containerClassName={styles.layout__header__container}
        className={styles.layout__header}
      >
        <Link to="/">
          <img src={Logo} alt="Logo" className={styles.logo} />
        </Link>
        <div className={styles.layout__header__actions}>
          <Search
            placeholder="Search component..."
            addon={(input) => (
              <KeyboardShortcut
                shortcut="ctrl+k"
                onShortcut={() => input.focus()}
              />
            )}
          />
          <Anchor
            href="https://github.com/paulhalleux/react-playground"
            target="_blank"
          >
            <GithubIcon height={20} width={20} />
          </Anchor>
        </div>
      </Container>
      <Container as="section" containerClassName={styles.layout__content}>
        <Outlet />
      </Container>
      <Container
        as="footer"
        containerClassName={styles.layout__footer__container}
        className={styles.layout__footer}
      >
        <p>&copy; {new Date().getFullYear()} Paul HALLEUX</p>
        <p>
          Visit{" "}
          <Anchor
            href="https://github.com/paulhalleux/react-playground"
            target="_blank"
          >
            GitHub
          </Anchor>{" "}
          repository
        </p>
      </Container>
    </main>
  );
}
