import React from "react";

/*@jsxRuntime automatic @jsxImportSource react*/
import {Properties, Example} from "../components";
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    code: "code",
    h2: "h2",
    h3: "h3",
    pre: "pre",
    blockquote: "blockquote"
  }, props.components);
  return <><_components.h1>{"KeyframePath"}</_components.h1>{"\n"}<_components.p><_components.code>{"KeyframePath"}</_components.code>{" is a component that allows you to display a path of keyframes that can be moved around and edited.\r\nA keyframe is an object with a position and a time. The position is relative to the parent element of the keyframe path.\r\nThe time is a number that can be used to interpolate between keyframes.\r\nThe interpolation is "}<_components.code>{"linear"}</_components.code>{" by default but can be changed to a "}<_components.code>{"bezier curve"}</_components.code>{"."}</_components.p>{"\n"}<_components.p>{"If the "}<_components.code>{"enableBezier"}</_components.code>{" prop is set to "}<_components.code>{"true"}</_components.code>{", the user can move the bezier handles of the keyframes\r\nand change the interpolation type to "}<_components.code>{"bezier"}</_components.code>{" by double-clicking on the keyframe."}</_components.p>{"\n"}<_components.h2>{"Example"}</_components.h2>{"\n"}<Example name="KeyframePath" />{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"KeyframePath Props"}</_components.h3>{"\n"}<Properties properties={[{
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
  }]} />{"\n"}<_components.h3>{"Keyframe Type"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-ts">{"type Keyframe = {\r\n  position: { x: number; y: number };\r\n  time: number;\r\n  interpolation?: Interpolation;\r\n};\n"}</_components.code></_components.pre>{"\n"}<_components.blockquote>{"\n"}<_components.p>{"Note that "}<_components.code>{"interpolation"}</_components.code>{" is optional and defaults to "}<_components.code>{"linear"}</_components.code>{"."}</_components.p>{"\n"}</_components.blockquote>{"\n"}<_components.h3>{"Interpolation Type"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-ts">{"type LinearInterpolation = {\r\n  type: \"linear\";\r\n};\r\n\r\ntype BezierInterpolation = {\r\n  type: \"bezier\";\r\n  p1: { x: number; y: number };\r\n  p2: { x: number; y: number };\r\n};\r\n\r\ntype Interpolation = LinearInterpolation | BezierInterpolation;\n"}</_components.code></_components.pre></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
