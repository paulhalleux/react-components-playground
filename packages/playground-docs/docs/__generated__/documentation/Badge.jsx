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
  return <><_components.h1>{"Badge"}</_components.h1>{"\n"}<_components.p><_components.code>{"Badge"}</_components.code>{" is a component to display a badge. It can be used to display a status, a count, or any other information."}</_components.p>{"\n"}<_components.h2>{"Examples"}</_components.h2>{"\n"}<_components.h3>{"Badge"}</_components.h3>{"\n"}<Example name="Badge" />{"\n"}<_components.h3>{"Pill"}</_components.h3>{"\n"}<_components.p>{"Pill are badges that are pill-shaped."}</_components.p>{"\n"}<Example name="Badge" hideCode props={{
    pill: true
  }} />{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"Badge Props"}</_components.h3>{"\n"}<Properties properties={[{
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
    type: '"primary" | "secondary" | "default"',
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
