import React from "react";
import { CodeBlock, Tabs } from "@paulhalleux/react-playground";

import { Alert } from "../../../src/components";
import { Code } from "../../../src/components/Mdx/Code/Code";
import { Examples, ExamplesSources } from "../../__generated__";

import { SelectControl } from "./Controls/SelectControl";
import { Control, ExampleMetadata } from "./index";

import styles from "./Example.module.scss";

const ControlMap = {
  select: SelectControl,
};

type ExampleProps = {
  name: string;
  hideCode?: boolean;
  props?: Record<string, any>;
};

export function Example({ name, hideCode, props }: ExampleProps) {
  const {
    ExampleComponent,
    sources,
    controls: controlsList,
  } = getExampleInfo(name);
  const [controls, setControls] = React.useState<Control[] | undefined>(
    controlsList,
  );

  if (!ExampleComponent) {
    return (
      <Alert>
        Example <Code>{name}</Code> not found
      </Alert>
    );
  }

  const onControlChange = (control: Control, value: any) => {
    setControls(
      controls?.map((c) => {
        if (c.property === control.property) {
          return {
            ...c,
            value,
          };
        }

        return c;
      }),
    );
  };

  const RenderedExample = (
    <div>
      <ExampleComponent
        {...props}
        controls={controls?.reduce(
          (acc, control) => {
            acc[control.property] = control.value;
            return acc;
          },
          {} as Record<string, any>,
        )}
      />
      {controls && (
        <div className={styles.example__controls}>
          {controls.map((control) => (
            <div
              key={control.property}
              className={styles.example__controls__item}
            >
              <label
                className={styles.example__controls__label}
                htmlFor={control.property}
              >
                {control.label}
              </label>
              {ControlMap[control.type as keyof typeof ControlMap]({
                control: control as any,
                onChange: (value) => onControlChange(control, value),
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (hideCode) {
    return RenderedExample;
  }

  return (
    <Tabs layout="compact">
      <Tabs.Tab label="Preview" id="preview">
        {RenderedExample}
      </Tabs.Tab>
      <Tabs.Tab label="Code" id="code">
        <pre>
          <CodeBlock language="tsx" defaultExpanded>
            {sources}
          </CodeBlock>
        </pre>
      </Tabs.Tab>
    </Tabs>
  );
}

function getExampleInfo(name: string) {
  const example = Examples[
    name.replace("/", "") as keyof typeof Examples
  ] as ExampleMetadata;

  const sources =
    ExamplesSources[name.replace("/", "") as keyof typeof ExamplesSources];

  return {
    ExampleComponent: example?.component,
    controls: example?.controls,
    sources,
  };
}
