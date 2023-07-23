/*@jsxRuntime automatic @jsxImportSource react*/
import {Properties, Example} from "../../components";
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    code: "code",
    h2: "h2",
    h3: "h3",
    pre: "pre"
  }, props.components);
  return <><_components.h1>{"Table"}</_components.h1>{"\n"}<_components.p><_components.code>{"Table"}</_components.code>{" is a component to display data in a table. It supports sorting and custom rendering."}</_components.p>{"\n"}<_components.h2>{"Examples"}</_components.h2>{"\n"}<_components.h3>{"Simple Table"}</_components.h3>{"\n"}<Example name="Table/SimpleTable" />{"\n"}<_components.h3>{"Custom Rendering"}</_components.h3>{"\n"}<_components.p>{"You can customize the rendering of the table cells and headers by providing a "}<_components.code>{"render"}</_components.code>{" or "}<_components.code>{"renderHeader"}</_components.code>{" function to the column."}</_components.p>{"\n"}<Example name="Table/CustomRendering" />{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"Table Props"}</_components.h3>{"\n"}<Properties properties={[{
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
