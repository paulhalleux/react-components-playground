/*@jsxRuntime automatic @jsxImportSource react*/
import {Properties, Example} from "../../components";
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    code: "code",
    h2: "h2",
    h3: "h3"
  }, props.components);
  return <><_components.h1>{"Tabs"}</_components.h1>{"\n"}<_components.p><_components.code>{"Tabs"}</_components.code>{" are used to display multiple panels of content at once. They are commonly used for navigation."}</_components.p>{"\n"}<_components.h2>{"Examples"}</_components.h2>{"\n"}<_components.h3>{"Compact Layout Tabs"}</_components.h3>{"\n"}<Example name="Tabs/Compact" />{"\n"}<_components.h3>{"Spaced Layout Tabs"}</_components.h3>{"\n"}<Example name="Tabs/Spaced" />{"\n"}<_components.h3>{"Horizontal Orientation"}</_components.h3>{"\n"}<Example name="Tabs/Horizontal" />{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"Tabs Props"}</_components.h3>{"\n"}<Properties properties={[{
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
  }]} /></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
