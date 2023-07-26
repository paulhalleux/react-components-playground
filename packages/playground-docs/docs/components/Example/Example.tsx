import React, { useRef } from "react";
import { CodeBlock, Tabs } from "@paulhalleux/react-playground";

import { Alert } from "../../../src/components";
import { Code } from "../../../src/components/Mdx/Code/Code";
import { Examples, ExamplesSources } from "../../__generated__";
import { Display } from "../Display";

import { BooleanControl } from "./Controls/BooleanControl";
import { SelectControl } from "./Controls/SelectControl";
import { StringControl } from "./Controls/StringControl";
import { Control, ExampleRef } from "./index";

import styles from "./Example.module.scss";

const ControlMap = {
  select: SelectControl,
  string: StringControl,
  boolean: BooleanControl,
};

type ExampleProps = {
  name: string;
  hideCode?: boolean;
  props?: Record<string, any>;
};

export function Example({ name, hideCode, props }: ExampleProps) {
  const exampleRef = useRef<ExampleRef>();

  const { example, sources } = getExampleInfo(name);
  const [controls, setControls] = React.useState<Control[] | undefined>(
    example.controls,
  );

  if (!example.component) {
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
      <Display onReset={exampleRef.current?.reset} {...example.display}>
        <example.component
          {...props}
          ref={exampleRef}
          controls={controls?.reduce(
            (acc, control) => {
              acc[control.property] = control.value;
              return acc;
            },
            {} as Record<string, any>,
          )}
        />
      </Display>
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
              <div className={styles.control}>
                {ControlMap[control.type as keyof typeof ControlMap]({
                  // @ts-ignore
                  control: control,
                  onChange: (value) => onControlChange(control, value),
                })}
              </div>
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
  const exampleName = name.replace("/", "") as keyof typeof Examples;

  const example = Examples[exampleName].metadata;
  const sources = ExamplesSources[exampleName];

  return {
    example,
    sources,
  };
}
