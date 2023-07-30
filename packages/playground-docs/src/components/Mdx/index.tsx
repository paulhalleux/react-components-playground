import React, { PropsWithChildren } from "react";
import { InfoIcon } from "@paulhalleux/react-playground";

import { Example, Features, Properties } from "../../../docs/components";
import { Alert } from "../Alert";

import { ApiType } from "./ApiType/ApiType";
import { Code } from "./Code/Code";
import { Paragraph } from "./Paragraph/Paragraph";
import { Table } from "./Table/Table";
import { Title } from "./Title/Title";

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
  blockquote: (props) => <Alert icon={InfoIcon} {...props} />,
  Example,
  Properties,
  Features,
  ApiType,
  Title,
};
