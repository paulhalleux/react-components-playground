/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from "react";
import { useClickAway } from "react-use";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { Badge } from "../Badge";
import { Label } from "../Label";

import styles from "./StringBuilder.module.scss";

export type StringBuilderVariable = { label: string; value: string };

export type StringBuilderProps = {
  value: string;
  onChange: (value: string) => void;
  variables: StringBuilderVariable[];
} & BaseProps;

export function StringBuilder({
  variables,
  className,
  value,
  onChange,
  ...rest
}: StringBuilderProps) {
  const defaultValueRef = useRef<string>(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const [focused, setFocused] = React.useState(false);

  const onInput = () => {
    if (!editorRef.current) return;
    const parsedValue = parseContent(editorRef.current.innerHTML);
    onChange(parsedValue);
  };

  const onVariableClick = (
    event: React.MouseEvent<HTMLSpanElement>,
    variable: StringBuilderVariable,
  ) => {
    if (!editorRef.current || !focused) return;
    editorRef.current.focus();

    event.preventDefault();
    event.stopPropagation();

    const selection = window.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);
    const node = document.createElement("span");

    node.dataset.variable = variable.value;
    node.classList.add(styles.builder__tag);
    node.contentEditable = "false";
    node.innerHTML = variable.label;

    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    onInput();
    editorRef.current.focus();
  };

  useClickAway(containerRef, () => {
    setFocused(false);
  });

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();

      const selection = window.getSelection();
      if (!selection) return;
      const range = selection.getRangeAt(0);
      const node = document.createElement("br");
      range.insertNode(node);
      range.setStartAfter(node);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

      onInput();
    }
  };

  return (
    <div className={styles.builder__container} {...rest}>
      <div
        ref={editorRef}
        contentEditable
        className={clsx(styles.builder__editor)}
        onFocus={() => setFocused(true)}
        onKeyDown={onKeyDown}
        dangerouslySetInnerHTML={{
          __html: parseValue(defaultValueRef.current, variables),
        }}
        onInput={onInput}
      />
      <div className={styles.builder__variables} ref={containerRef}>
        <Label>Variables</Label>
        <div className={styles.builder__variables__list}>
          {variables.map((variable) => (
            <Badge
              shape="pill"
              key={variable.value}
              className={styles.builder__variables__item}
              onClick={(event) => onVariableClick(event, variable)}
            >
              {variable.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function parseValue(value: string, variables: StringBuilderVariable[]) {
  const spanAttributes = {
    contenteditable: "false",
    class: styles.builder__tag,
  };

  const variableRegex = /{{\s*(\w+)\s*}}/g;

  return value
    .replace(variableRegex, (match, variable) => {
      const variableObject = variables.find((v) => v.value === variable);
      if (!variableObject) return match;
      return `<span data-variable="${variable}" ${Object.entries(spanAttributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")}>${variableObject.label}</span>`;
    })
    .replace(/\n/g, "<br>");
}

function parseContent(content: string) {
  const parsedHtml = new DOMParser().parseFromString(content, "text/html");
  const variables = parsedHtml.querySelectorAll(
    `.${styles.builder__tag}`,
  ) as NodeListOf<HTMLSpanElement>;

  variables.forEach((variable) => {
    variable.outerHTML = `{{${variable.dataset.variable}}}`;
  });

  const innerHtml = `${parsedHtml.body.innerHTML}`;
  return innerHtml.replace(/<br>/g, "\n");
}
