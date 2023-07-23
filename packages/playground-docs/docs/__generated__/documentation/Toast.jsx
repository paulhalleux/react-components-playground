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
  return <><_components.h1>{"Toast"}</_components.h1>{"\n"}<_components.p><_components.code>{"Toast"}</_components.code>{" is a component that displays a message to the user. It is used to provide feedback about an operation or inform something important."}</_components.p>{"\n"}<_components.h2>{"Example"}</_components.h2>{"\n"}<Example name="Toast" />{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"ToasterProvider"}</_components.h3>{"\n"}<_components.p>{"The "}<_components.code>{"ToasterProvider"}</_components.code>{" component is used to display the "}<_components.code>{"Toast"}</_components.code>{" components. It should be placed at the root of your application."}</_components.p>{"\n"}<_components.pre><_components.code className="language-tsx">{"import { ToasterProvider } from \"@paulhalleux/react-playground\";\r\n\r\nconst App = () => (\r\n  <ToasterProvider>\r\n    <App />\r\n  </ToasterProvider>\r\n);\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"useToasts"}</_components.h3>{"\n"}<_components.p>{"The "}<_components.code>{"useToasts"}</_components.code>{" hook returns a "}<_components.code>{"pushToast"}</_components.code>{" function that can be used to push a new toast to the "}<_components.code>{"ToasterProvider"}</_components.code>{"."}</_components.p>{"\n"}<_components.pre><_components.code className="language-ts">{"import { useToasts } from \"@paulhalleux/react-playground\";\r\n\r\nconst { pushToast } = useToasts();\r\n\r\n// --> pushToast(toast: ToastType) => void\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Toast Type"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-ts">{"type Toast = {\r\n  icon?: React.FC<IconProps>;\r\n  title?: string;\r\n  content: string;\r\n  type?: \"primary\" | \"success\" | \"warning\" | \"error\" | \"default\";\r\n  duration?: number;\r\n  closable?: boolean;\r\n  actionLabel?: string;\r\n  onAction?: () => void;\r\n};\n"}</_components.code></_components.pre></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
