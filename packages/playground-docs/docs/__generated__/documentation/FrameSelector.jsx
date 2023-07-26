/*@jsxRuntime automatic @jsxImportSource react*/
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    code: "code",
    h2: "h2",
    h3: "h3",
    pre: "pre"
  }, props.components), {Example, Properties} = _components;
  if (!Example) _missingMdxReference("Example", true);
  if (!Properties) _missingMdxReference("Properties", true);
  return <><_components.p><_components.code>{"FrameSelector"}</_components.code>{" is a component to select a frame (size and position) in a container.\r\nIt can be used to crop an image or to select a region of interest."}</_components.p>{"\n"}<_components.p>{"The component has multiple handles that can be used to resize the frame.\r\nThe frame can be moved by dragging the center of the frame."}</_components.p>{"\n"}<_components.p>{"It also accepts a "}<_components.code>{"children"}</_components.code>{" prop that will be rendered inside the frame. In the example below, we use the "}<_components.code>{"CrossHead"}</_components.code>{" component to render a cross inside the frame."}</_components.p>{"\n"}<_components.h2>{"Example"}</_components.h2>{"\n"}<Example name="FrameSelector" />{"\n"}<_components.h2>{"API"}</_components.h2>{"\n"}<_components.h3>{"FrameSelector Props"}</_components.h3>{"\n"}<Properties properties={[{
    name: "children",
    type: "React.ReactNode",
    description: "Children to render inside the frame."
  }, {
    name: "parentRef",
    type: "React.RefObject<HTMLElement>",
    description: "Reference to the parent element of the frame selector.",
    required: true
  }, {
    name: "size",
    type: "Size",
    description: "Size of the frame.",
    required: true
  }, {
    name: "onSizeChange",
    type: "(size: Size) => void",
    description: "Callback when the size of the frame changes.",
    required: true
  }, {
    name: "position",
    type: "Point",
    description: "Position of the frame.",
    required: true
  }, {
    name: "onPositionChange",
    type: "(position: Point) => void",
    description: "Callback when the position of the frame changes.",
    required: true
  }, {
    name: "minSize",
    type: "Size",
    description: "Minimum size of the frame."
  }, {
    name: "maxSize",
    type: "Size",
    description: "Maximum size of the frame."
  }, {
    name: "color",
    type: "[number, number, number]",
    description: "Color of the frame."
  }]} />{"\n"}<_components.h3>{"Point Type"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-ts">{"type Point = {\r\n  x: number;\r\n  y: number;\r\n};\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Size Type"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-ts">{"type Size = {\r\n  width: number;\r\n  height: number;\r\n};\n"}</_components.code></_components.pre></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
function _missingMdxReference(id, component) {
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}
