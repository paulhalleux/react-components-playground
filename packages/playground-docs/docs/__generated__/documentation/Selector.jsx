/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    code: "code",
    h2: "h2",
    h3: "h3"
  }, props.components), {Example, Properties} = _components;
  if (!Example) _missingMdxReference("Example", true);
  if (!Properties) _missingMdxReference("Properties", true);
  return <><_components.p><_components.code>{"Selector"}</_components.code>{" is a component that allows you to select elements in a container.\r\nIt works like a lasso tool, where you click and drag to select elements."}</_components.p>{"\n"}<_components.h2>{"Example"}</_components.h2>{"\n"}<Example name="Selector" />{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"Selector Props"}</_components.h3>{"\n"}<Properties properties={[{
    name: "parentRef",
    type: "React.RefObject<HTMLElement>",
    description: "The parent element to select elements in.",
    required: true
  }, {
    name: "color",
    type: "[number, number, number]",
    description: "The color of the selector."
  }, {
    name: "children",
    type: "React.ReactNode",
    description: "The elements to select."
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
