import React, { PropsWithChildren } from "react";
import { InfoIcon } from "@paulhalleux/react-playground";

import { Alert } from "../Alert";

import { ApiType } from "./ApiType/ApiType";
import { Code } from "./Code/Code";
import { Paragraph } from "./Paragraph/Paragraph";
import { Table } from "./Table/Table";
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
  table: Table,
  p: Paragraph,
  ul: (props) => <UnorderedList {...props} />,
  blockquote: (props) => <Alert icon={InfoIcon} {...props} />,
  Example,
  Properties,
  ApiType,
  Title,
};
