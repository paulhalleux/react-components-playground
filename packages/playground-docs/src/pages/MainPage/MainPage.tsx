import { useState } from "react";

import { Search } from "../../components";
import { Component } from "../../types/component";

import { MainItem } from "./MainItem";

import styles from "./MainPage.module.scss";

type MainPageProps = {
  components: Component[];
};

export function MainPage({ components }: MainPageProps) {
  const [search, setSearch] = useState<string>("");

  return (
    <div className={styles.main__container}>
      <header>
        <Search
          placeholder="Search components"
          value={search}
          onChange={setSearch}
        />
      </header>
      <section className={styles.main__grid}>
        {components
          .filter((component) =>
            component.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((component) => (
            <MainItem component={component} key={component.path} />
          ))}
      </section>
    </div>
  );
}
