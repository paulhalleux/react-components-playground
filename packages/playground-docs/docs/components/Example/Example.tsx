import { Code } from "../../../src/components/Mdx/Code/Code";
import { Examples, Sources } from "../../_generated/_examples";

import styles from "./Example.module.scss";

export type ExampleProps = {
  hideCode?: boolean;
  props?: Record<string, any>;
};

type DisplayExampleProps = {
  name: string;
  hideCode?: boolean;
  props?: Record<string, any>;
};

export function Example({ name, hideCode, props }: DisplayExampleProps) {
  const ExampleComponent =
    Examples[name.replace("/", "") as keyof typeof Examples].component;
  const sources = Sources[name.replace("/", "") as keyof typeof Sources];

  return (
    <div className={styles.example}>
      <ExampleComponent {...props} />
      {!hideCode && (
        <pre>
          <Code isBlock>{sources}</Code>
        </pre>
      )}
    </div>
  );
}
