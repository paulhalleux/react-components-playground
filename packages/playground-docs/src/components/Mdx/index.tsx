import React, { PropsWithChildren } from "react";
import { InfoIcon } from "@paulhalleux/react-playground";

import { Example, Features, Properties } from "../../../docs/components";
import { Alert } from "../Alert";

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
  h1: (props) => <Title level={1} {...props} />,
  h2: (props) => <Title level={2} {...props} />,
  h3: (props) => <Title level={3} {...props} />,
  h4: (props) => <Title level={4} {...props} />,
  h5: (props) => <Title level={5} {...props} />,
  h6: (props) => <Title level={6} {...props} />,
  code: (props) => (
    <Code isBlock={props.className?.startsWith("language-")} {...props} />
  ),
  table: Table,
  p: Paragraph,
  blockquote: (props) => <Alert icon={InfoIcon} {...props} />,
  Example,
  Properties,
  Features,
};
