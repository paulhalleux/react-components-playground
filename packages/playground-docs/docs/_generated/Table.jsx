import React from "react";

/*@jsxRuntime automatic @jsxImportSource react*/
import {Properties} from "../components";
import {SimpleTableExample} from "../examples/Table/SimpleTableExample";
import {CustomRenderingExample} from "../examples/Table/CustomRenderingExample";
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    code: "code",
    h2: "h2",
    h3: "h3",
    pre: "pre"
  }, props.components);
  return <><_components.h1>{"Table"}</_components.h1>{"\n"}<_components.p><_components.code>{"Table"}</_components.code>{" is a component to display data in a table. It supports sorting and custom rendering."}</_components.p>{"\n"}<_components.h2>{"Examples"}</_components.h2>{"\n"}<_components.h3>{"Simple Table"}</_components.h3>{"\n"}<SimpleTableExample />{"\n"}<_components.pre><_components.code className="language-tsx">{"import { Table } from \"@paulhalleux/react-playground\";\r\n\r\nexport function App() {\r\n  return (\r\n    <Table\r\n      columns={[\r\n        { key: \"id\", label: \"ID\", width: 100 },\r\n        {\r\n          key: \"name\",\r\n          label: \"Name\",\r\n          sortable: true,\r\n          sortFn: sortName,\r\n          width: 200,\r\n        },\r\n        { key: \"age\", label: \"Age\", width: 100 },\r\n      ]}\r\n      data={[\r\n        { id: 1, name: \"Paul\", age: 30 },\r\n        { id: 2, name: \"John\", age: 40 },\r\n        { id: 3, name: \"Jane\", age: 50 },\r\n      ]}\r\n    />\r\n  );\r\n}\r\n\r\nfunction sortName(a: Person, b: Person, sort: \"asc\" | \"desc\" | null) {\r\n  if (sort === \"asc\") {\r\n    return a.name.localeCompare(b.name);\r\n  } else if (sort === \"desc\") {\r\n    return b.name.localeCompare(a.name);\r\n  } else {\r\n    return 0;\r\n  }\r\n}\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Custom Rendering"}</_components.h3>{"\n"}<CustomRenderingExample />{"\n"}<_components.pre><_components.code className="language-tsx">{"import { Table } from \"@paulhalleux/react-playground\";\r\n\r\nexport function App() {\r\n  return (\r\n    <Table\r\n      columns={[\r\n        { key: \"id\", label: \"ID\", width: 100 },\r\n        {\r\n          key: \"name\",\r\n          label: \"Name\",\r\n          sortable: true,\r\n          sortFn: sortName,\r\n          width: 200,\r\n          renderHeader: (label) => (\r\n            <span style={{ textDecoration: \"underline\" }}>{label}</span>\r\n          ),\r\n          render: (value) => (\r\n            <span\r\n              style={{\r\n                fontWeight: 800,\r\n                display: \"flex\",\r\n                alignItems: \"center\",\r\n                gap: 8,\r\n              }}\r\n            >\r\n              <ArrowRightIcon width={16} height={16} />\r\n              {value}\r\n            </span>\r\n          ),\r\n        },\r\n        { key: \"age\", label: \"Age\", width: 100 },\r\n      ]}\r\n      data={[\r\n        { id: 1, name: \"Paul\", age: 30 },\r\n        { id: 2, name: \"John\", age: 40 },\r\n        { id: 3, name: \"Jane\", age: 50 },\r\n      ]}\r\n    />\r\n  );\r\n}\r\n\r\nfunction sortName(a: Person, b: Person, sort: \"asc\" | \"desc\" | null) {\r\n  if (sort === \"asc\") {\r\n    return a.name.localeCompare(b.name);\r\n  } else if (sort === \"desc\") {\r\n    return b.name.localeCompare(a.name);\r\n  } else {\r\n    return 0;\r\n  }\r\n}\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"Table Props"}</_components.h3>{"\n"}<Properties properties={[{
    name: 'columns',
    type: 'TableColumn<T>[]',
    description: 'The columns to display in the table.',
    required: true
  }, {
    name: 'data',
    type: 'T[]',
    description: 'The data to display in the table.',
    required: true
  }, {
    name: 'maxHeight',
    type: 'string | number',
    description: 'The maximum height of the table.'
  }]} />{"\n"}<_components.h3>{"TableColumn Type"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-typescript">{"type TableColumn<T extends Record<string, any>> = {\r\n  key: keyof T;\r\n  label: string;\r\n  render?: (value: T[keyof T]) => React.ReactNode;\r\n  renderHeader?: (label: string) => React.ReactNode;\r\n  sortable?: boolean;\r\n  sortFn?: (a: T, b: T, order: \"asc\" | \"desc\" | null) => number;\r\n  sort?: \"asc\" | \"desc\" | null;\r\n  width?: string | number;\r\n};\n"}</_components.code></_components.pre></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
