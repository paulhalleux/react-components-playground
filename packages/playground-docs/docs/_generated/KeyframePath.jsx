import React from "react";

/*@jsxRuntime automatic @jsxImportSource react*/
import {Properties} from "../components";
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    code: "code",
    pre: "pre",
    h2: "h2",
    h3: "h3"
  }, props.components);
  return <><_components.h1>{"KeyframePath"}</_components.h1>{"\n"}<_components.p><_components.code>{"KeyframePath"}</_components.code>{" is a component that allows you to display a path of keyframes that can be moved around and edited."}</_components.p>{"\n"}<_components.pre><_components.code className="language-tsx">{"import { KeyframePath, Keyframe } from \"@paulhalleux/react-playground\";\r\n\r\nconst App = () => {\r\n  const containerRef = React.useRef<HTMLDivElement>(null);\r\n  const [keyframes, setKeyframes] = React.useState<Keyframe>([\r\n    { position: { x: 0, y: 0 }, time: 0 },\r\n    { position: { x: 100, y: 100 }, time: 1 },\r\n    { position: { x: 200, y: 0 }, time: 2 },\r\n  ]);\r\n\r\n  return (\r\n    <div ref={containerRef}>\r\n      <KeyframePath\r\n        parentRef={containerRef}\r\n        keyframes={keyframes}\r\n        onKeyframeChange={(keyframes) => setKeyframes(keyframes)}\r\n        enableBezier={true}\r\n        enablePathMove={true}\r\n        onKeyframeSelect={(keyframe) => console.log(keyframe)}\r\n        pathColor={[10, 10, 10]}\r\n        selectedKeyframes={[0, 2]}\r\n      />\r\n    </div>\r\n  );\r\n};\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"KeyframePath Props"}</_components.h3>{"\n"}<Properties properties={[{
    name: "parentRef",
    type: "React.RefObject<HTMLElement>",
    description: "The parent element of the keyframe path. This is used to compute the position of the keyframes."
  }, {
    name: "keyframes",
    type: "Keyframe[]",
    description: "The keyframes to display."
  }, {
    name: "onKeyframeChange",
    type: "(keyframes: Keyframe[]) => void",
    description: "Callback when the keyframes change."
  }, {
    name: "enableBezier",
    type: "boolean",
    description: "Whether to enable bezier handles."
  }, {
    name: "enablePathMove",
    type: "boolean",
    description: "Whether to enable moving the path."
  }, {
    name: "onKeyframeSelect",
    type: "(keyframe: Keyframe) => void",
    description: "Callback when a keyframe is selected."
  }, {
    name: "pathColor",
    type: "number[]",
    description: "The color of the path."
  }, {
    name: "selectedKeyframes",
    type: "number[]",
    description: "The time of the selected keyframes. This is used to display the selected keyframes. The time of the selected keyframes. This is used to display the selected keyframes."
  }]} /></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
