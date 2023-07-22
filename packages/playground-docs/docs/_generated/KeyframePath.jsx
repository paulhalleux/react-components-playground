import React from "react";

/*@jsxRuntime automatic @jsxImportSource react*/
import {Properties} from "../components";
import {KeyframePathExample} from "../examples/KeyframePathExample";
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    code: "code",
    h2: "h2",
    pre: "pre",
    h3: "h3"
  }, props.components);
  return <><_components.h1>{"KeyframePath"}</_components.h1>{"\n"}<_components.p><_components.code>{"KeyframePath"}</_components.code>{" is a component that allows you to display a path of keyframes that can be moved around and edited.\r\nA keyframe is an object with a position and a time. The position is relative to the parent element of the keyframe path.\r\nThe time is a number that can be used to interpolate between keyframes.\r\nThe interpolation is "}<_components.code>{"linear"}</_components.code>{" by default but can be changed to a "}<_components.code>{"bezier curve"}</_components.code>{"."}</_components.p>{"\n"}<_components.p>{"If the "}<_components.code>{"enableBezier"}</_components.code>{" prop is set to "}<_components.code>{"true"}</_components.code>{", the user can move the bezier handles of the keyframes\r\nand change the interpolation type to "}<_components.code>{"bezier"}</_components.code>{" by double-clicking on the keyframe."}</_components.p>{"\n"}<_components.h2>{"Example"}</_components.h2>{"\n"}<KeyframePathExample />{"\n"}<_components.pre><_components.code className="language-tsx">{"import { KeyframePath, Keyframe } from \"@paulhalleux/react-playground\";\r\n\r\nconst App = () => {\r\n  const containerRef = React.useRef<HTMLDivElement>(null);\r\n  const [keyframes, setKeyframes] = React.useState<Keyframe>([\r\n    { position: { x: 0, y: 0 }, time: 0 },\r\n    { position: { x: 100, y: 100 }, time: 1 },\r\n    { position: { x: 200, y: 0 }, time: 2 },\r\n  ]);\r\n\r\n  const onKeyframeChange = (keyframe: number, partial: Partial<Keyframe[]>) => {\r\n    const newKeyframes = [...keyframes];\r\n    newKeyframes[keyframe] = { ...newKeyframes[keyframe], ...partial };\r\n    setKeyframes(newKeyframes);\r\n  };\r\n\r\n  return (\r\n    <div ref={containerRef}>\r\n      <KeyframePath\r\n        parentRef={containerRef}\r\n        keyframes={keyframes}\r\n        onKeyframeChange={onKeyframeChange}\r\n        enableBezier={true}\r\n        enablePathMove={true}\r\n        pathColor={[255, 255, 255]}\r\n      />\r\n    </div>\r\n  );\r\n};\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"KeyframePath Props"}</_components.h3>{"\n"}<Properties properties={[{
    name: "parentRef",
    type: "React.RefObject<HTMLElement>",
    description: "Reference of the parent element of the keyframe path.",
    required: true
  }, {
    name: "keyframes",
    type: "Keyframe[]",
    description: "The keyframes to display.",
    required: true
  }, {
    name: "onKeyframeChange",
    type: "(index: number, partial: Partial<Keyframe>) => void",
    description: "Callback when a keyframe change.",
    required: true
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
    type: "(indexes: number[]) => void",
    description: "Callback when a keyframe is selected."
  }, {
    name: "pathColor",
    type: "[number, number, number]",
    description: "The color of the path and keyframes."
  }, {
    name: "selectedKeyframes",
    type: "number[]",
    description: "The indexes of the selected keyframes."
  }]} />{"\n"}<_components.h3>{"Keyframe Type"}</_components.h3>{"\n"}<Properties properties={[{
    name: "position",
    type: "{ x: number, y: number }",
    description: "The position of the keyframe.",
    required: true
  }, {
    name: "time",
    type: "number",
    description: "The time of the keyframe.",
    required: true
  }, {
    name: "interpolation",
    type: "{ type: 'linear' | 'bezier', p1: Point, p2: Point }",
    description: "The bezier handles of the keyframe."
  }]} /></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
