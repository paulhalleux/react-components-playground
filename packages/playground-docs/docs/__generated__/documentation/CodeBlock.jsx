/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    code: "code",
    h2: "h2",
    h3: "h3"
  }, props.components), {Example, Features, Properties} = _components;
  if (!Example) _missingMdxReference("Example", true);
  if (!Features) _missingMdxReference("Features", true);
  if (!Properties) _missingMdxReference("Properties", true);
  return <><_components.p><_components.code>{"CodeBlock"}</_components.code>{" is a component that displays a block of code.\r\nIf the height of the code block exceeds the value of "}<_components.code>{"collapseAt"}</_components.code>{" property, it will be collapsed and a button will be displayed to expand it."}</_components.p>{"\n"}<_components.h2>{"Example"}</_components.h2>{"\n"}<Example name="CodeBlock" highlight="25" />{"\n"}<Features features={['The code block can be expanded and collapsed.', 'All languages supported by Highlight.js are supported.', 'Line highlighting is supported.']} />{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"CodeBlock Props"}</_components.h3>{"\n"}<Properties properties={[{
    name: 'children',
    type: 'ReactNode',
    description: 'The code to be displayed.',
    required: true
  }, {
    name: "className",
    type: "string",
    description: "The class name of the component."
  }, {
    name: "defaultExpanded",
    type: "boolean",
    description: "If true, the code block will be expanded by default."
  }, {
    name: "language",
    type: "string",
    description: "The language of the code block."
  }, {
    name: "collapseAt",
    type: "number",
    description: "The height at which the code block will be collapsed automatically.",
    default: '300px'
  }]} /></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
function _missingMdxReference(id, component) {
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}
