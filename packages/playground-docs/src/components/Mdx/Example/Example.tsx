import React, { useRef, useState } from "react";
import { CodeBlock, Tabs } from "@paulhalleux/react-playground";
import kebabCase from "lodash/kebabCase";

import { Examples, ExamplesSources } from "@/generated";

import { Alert } from "../../index";
import { Code } from "../Code/Code";
import { Display } from "../Display";
import { Title } from "../Title/Title";

import { BooleanControl } from "./Controls/BooleanControl";
import { NumberControl } from "./Controls/NumberControl";
import { SelectControl } from "./Controls/SelectControl";
import { StringControl } from "./Controls/StringControl";
import { Control, ExampleRef } from "./index";

import styles from "./Example.module.scss";

const ControlMap = {
  select: SelectControl,
  string: StringControl,
  boolean: BooleanControl,
  number: NumberControl,
};

type ExampleProps = {
  name: string;
  hideCode?: boolean;
  highlight?: string;
  props?: Record<string, any>;
};

export function Example({ name, hideCode, highlight, props }: ExampleProps) {
  const exampleRef = useRef<ExampleRef>();

  const { example, sources } = getExampleInfo(name);

  const [controls, setControls] = useState<Control[] | undefined>(
    example?.controls,
  );

  if (!example?.component || !sources) {
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
                  id: name,
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
    <>
      <Title level={3}>
        <h3 id={`examples-${kebabCase(example.name)}`}>{example.name}</h3>
      </Title>
      <Tabs layout="compact">
        <Tabs.Tab label="Preview" id="preview">
          {RenderedExample}
        </Tabs.Tab>
        <Tabs.Tab label="Code" id="code">
          <CodeBlock
            language="tsx"
            defaultExpanded
            highlightedLines={highlight}
          >
            {sources}
          </CodeBlock>
        </Tabs.Tab>
      </Tabs>
    </>
  );
}

function getExampleInfo(name: string) {
  const example = Examples[name as keyof typeof Examples];
  const sources = ExamplesSources[name as keyof typeof Examples];

  if (!example)
    return {
      example: undefined,
      sources: undefined,
    };

  return {
    example: example.metadata,
    sources,
  };
}
