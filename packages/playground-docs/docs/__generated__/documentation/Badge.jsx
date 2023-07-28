/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    code: "code",
    h2: "h2",
    h3: "h3",
    pre: "pre"
  }, props.components), {Example, Features, Properties} = _components;
  if (!Example) _missingMdxReference("Example", true);
  if (!Features) _missingMdxReference("Features", true);
  if (!Properties) _missingMdxReference("Properties", true);
  return <><_components.p><_components.code>{"Badge"}</_components.code>{" is a component to display a badge. It can be used to display a status, a count, or any other information."}</_components.p>{"\n"}<_components.h2>{"Example"}</_components.h2>{"\n"}<Example name="Badge" highlight="22-24,27-29,32-34" />{"\n"}<Features features={['Multiple variants & sizes', 'Pill-shaped badges', 'Closeable badges']} />{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"Badge Props"}</_components.h3>{"\n"}<Properties properties={[{
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content of the badge.'
  }, {
    name: 'size',
    type: 'BadgeSize',
    description: 'The size of the badge.',
    default: '"medium"'
  }, {
    name: 'variant',
    type: 'BadgeVariant',
    description: 'The variant of the badge.',
    default: '"default"'
  }, {
    name: 'pill',
    type: 'boolean',
    description: 'Whether the badge should be pill-shaped.',
    default: 'false'
  }, {
    name: 'closeable',
    type: 'boolean',
    description: 'Whether the badge should be closeable.',
    default: 'false'
  }, {
    name: 'onClose',
    type: '() => void',
    description: 'Callback when the badge is closed.'
  }]} />{"\n"}<_components.h3>{"BadgeSize type"}</_components.h3>{"\n"}<_components.p>{"The "}<_components.code>{"BadgeSize"}</_components.code>{" type is an enum with the following values:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-ts">{"type BadgeSize = \"small\" | \"medium\" | \"large\"\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"BadgeVariant type"}</_components.h3>{"\n"}<_components.p>{"The "}<_components.code>{"BadgeVariant"}</_components.code>{" type is an enum with the following values:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-ts">{"type BadgeVariant = \"primary\" | \"secondary\" | \"default\" | \"danger\" | \"success\" | \"info\" | \"ghost\"\n"}</_components.code></_components.pre></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
function _missingMdxReference(id, component) {
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}
