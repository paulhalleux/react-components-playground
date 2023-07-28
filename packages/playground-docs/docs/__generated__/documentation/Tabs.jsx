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
  return <><_components.p><_components.code>{"Tabs"}</_components.code>{" are used to display multiple panels of content at once. They are commonly used for navigation."}</_components.p>{"\n"}<_components.h2>{"Examples"}</_components.h2>{"\n"}<_components.h3>{"Compact Layout Tabs"}</_components.h3>{"\n"}<Example name="Tabs/Compact" highlight="23-33" />{"\n"}<_components.h3>{"Spaced Layout Tabs"}</_components.h3>{"\n"}<Example name="Tabs/Spaced" highlight="16-26" />{"\n"}<_components.h3>{"Horizontal Orientation"}</_components.h3>{"\n"}<Example name="Tabs/Horizontal" highlight="7-17" />{"\n"}<Features features={['Multiple orientations', 'Multiple layouts', 'Add button', 'Closeable tabs']} />{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"Tabs Props"}</_components.h3>{"\n"}<Properties properties={[{
    name: 'children',
    type: 'React.Node',
    description: 'The content of the component.',
    required: true
  }, {
    name: 'defaultActiveTab',
    type: 'string',
    description: 'The default active tab. This is only used if `activeTab` is not set.'
  }, {
    name: 'orientation',
    type: '"horizontal" | "vertical"',
    description: 'The orientation of the component. Can be `horizontal` or `vertical`.',
    default: '"horizontal"'
  }, {
    name: 'layout',
    type: '"compact" | "spaced"',
    description: 'The layout of the component. Can be `compact` or `spaced`.',
    default: '"spaced"'
  }, {
    name: 'renderLabel',
    type: '(label: string) => ReactNode',
    description: 'A function to render the label of the tab. The default implementation is to render the label as text.',
    default: '(label) => label'
  }, {
    name: 'addButton',
    type: 'boolean',
    description: 'Whether or not display an add icon.',
    default: 'false'
  }, {
    name: 'onAdd',
    type: '() => void',
    description: 'Callback executed when add button is clicked.'
  }, {
    name: 'addDisabled',
    type: 'boolean',
    description: 'Whether or not the add button is disabled.',
    default: 'false'
  }, {
    name: 'addButtonLabel',
    type: 'string',
    description: 'The label of the add button.',
    default: '"Add tab"'
  }]} />{"\n"}<_components.h3>{"Tab Props"}</_components.h3>{"\n"}<Properties properties={[{
    name: 'children',
    type: 'React.Node',
    description: 'The content of the component.',
    required: true
  }, {
    name: 'label',
    type: 'string',
    description: 'The label of the tab.',
    required: true
  }, {
    name: 'id',
    type: 'string',
    description: 'The id of the tab. This is used to identify the tab.',
    required: true
  }, {
    name: 'closeable',
    type: 'boolean',
    description: 'Whether or not the tab can be closed.',
    default: 'false'
  }, {
    name: 'onClose',
    type: '() => void',
    description: 'A function that is called when the tab is closed.'
  }, {
    name: 'disabled',
    type: 'boolean',
    description: 'Whether or not the tab is disabled.',
    default: 'false'
  }, {
    name: 'closeDisabled',
    type: 'boolean',
    description: 'Whether or not the tab close button is disabled.',
    default: 'false'
  }, {
    name: 'contained',
    type: 'boolean',
    description: 'Whether or not the tab content should be contained.',
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
