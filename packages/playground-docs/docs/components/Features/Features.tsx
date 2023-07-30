import { CheckIcon } from "@paulhalleux/react-playground";

import { Title } from "../../../src/components/Mdx/Title/Title";

import styles from "./Features.module.scss";

type FeaturesProps = {
  features: string[];
};

export function Features({ features }: FeaturesProps) {
  return (
    <div className={styles.features__container}>
      <Title level={2}>
        <h2 id="features">Features</h2>
      </Title>
      <ul className={styles.features__list}>
        {features.map((feature) => (
          <li key={feature} className={styles.features__item}>
            <div className={styles.features__icon}>
              <CheckIcon />
            </div>
            <span className={styles.features__label}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
