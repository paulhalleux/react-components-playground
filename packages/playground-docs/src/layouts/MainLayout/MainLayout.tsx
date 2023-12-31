import { Helmet } from "react-helmet";
import { Outlet } from "react-router";

import { Footer } from "./Footer";
import { MainHeader } from "./Header";

import styles from "./MainLayout.module.scss";

export function MainLayout() {
  return (
    <main className={styles.layout}>
      <Helmet defaultTitle={"Playground"} titleTemplate={"%s | Playground"} />
      <section className={styles.content__wrapper}>
        <MainHeader />
        <div className={styles.content}>
          <Outlet />
        </div>
      </section>
      <Footer />
    </main>
  );
}
