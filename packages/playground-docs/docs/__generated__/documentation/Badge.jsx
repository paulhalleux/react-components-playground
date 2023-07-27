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
  return <><_components.p><_components.code>{"Badge"}</_components.code>{" is a component to display a badge. It can be used to display a status, a count, or any other information."}</_components.p>{"\n"}<_components.h2>{"Example"}</_components.h2>{"\n"}<Example name="Badge" />{"\n"}<Features features={['Multiple variants & sizes', 'Pill-shaped badges']} />{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"Badge Props"}</_components.h3>{"\n"}<Properties properties={[{
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content of the badge.'
  }, {
    name: 'size',
    type: '"small" | "medium" | "large"',
    description: 'The size of the badge.',
    default: '"medium"'
  }, {
    name: 'variant',
    type: '"primary" | "secondary" | "default" | "danger" | "success" | "info" | "ghost"',
    description: 'The variant of the badge.',
    default: '"default"'
  }, {
    name: 'pill',
    type: 'boolean',
    description: 'Whether the badge should be pill-shaped.',
    default: 'false'
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
