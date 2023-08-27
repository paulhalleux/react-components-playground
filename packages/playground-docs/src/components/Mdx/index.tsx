import React, { PropsWithChildren } from "react";
import { Anchor, Table } from "@paulhalleux/react-playground";

import { Alert } from "../Alert";

import { ApiType } from "./ApiType/ApiType";
import { Code } from "./Code/Code";
import { Paragraph } from "./Paragraph/Paragraph";
import { Title } from "./Title/Title";
import { UnorderedList } from "./UnorderedList/UnorderedList";
import { Example } from "./Example";
import { Properties } from "./Properties";

type MdxComponentProps =
  | PropsWithChildren<{
      className?: string;
    }>
  | any;

export const mdxComponents: Record<string, React.FC<MdxComponentProps>> = {
  code: (props) => (
    <Code isBlock={props.className?.startsWith("language-")} {...props} />
  ),
  p: Paragraph,
  a: (props) => (
    <Anchor
      to={props.href}
      {...props}
      underline
      asLink={!props.href.includes("http")}
      variant="secondary"
      target={props.href.includes("http") ? "_blank" : undefined}
    />
  ),
  ul: (props) => <UnorderedList {...props} />,
  blockquote: (props) => <Alert icon="info" {...props} />,
  Example,
  Properties,
  ApiType,
  Title,
  Table: (props) => <Table {...props} />,
};
