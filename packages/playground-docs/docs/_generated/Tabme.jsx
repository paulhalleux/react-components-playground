import React from "react";

/*@jsxRuntime automatic @jsxImportSource react*/
import { Properties } from "../components";
import { SelectorExample } from "../examples/Selector.example.js";
function _createMdxContent(props) {
  const _components = Object.assign(
    {
      h1: "h1",
      p: "p",
      code: "code",
      h2: "h2",
      pre: "pre",
      h3: "h3",
    },
    props.components,
  );
  return (
    <>
      <_components.h1>{"Selector"}</_components.h1>
      {"\n"}
      <_components.p>
        <_components.code>{"Selector"}</_components.code>
        {
          " is a component that allows you to select elements in a container.\r\nIt works like a lasso tool, where you click and drag to select elements."
        }
      </_components.p>
      {"\n"}
      <_components.h2>{"Example"}</_components.h2>
      {"\n"}
      <SelectorExample />
      {"\n"}
      <_components.pre>
        <_components.code className="language-tsx">
          {
            'import { useRef, useState } from "react";\r\nimport {\r\n  Selectable,\r\n  selectable,\r\n  Selector,\r\n} from "@paulhalleux/react-playground";\r\n\r\nexport function SelectorExample() {\r\n  const [selected, setSelected] = useState<string[]>([]);\r\n\r\n  const containerRef = useRef<HTMLDivElement>(null);\r\n\r\n  const onSelect = (id: string, selected: boolean) => {\r\n    if (selected) {\r\n      setSelected((prev) => [...prev, id]);\r\n    } else {\r\n      setSelected((prev) => prev.filter((item) => item !== id));\r\n    }\r\n  };\r\n\r\n  return (\r\n    <Display ref={containerRef}>\r\n      <Selector parentRef={containerRef}>\r\n        <SelectableItem\r\n          onSelect={(selected) => onSelect("a", selected)}\r\n          selected={selected.includes("a")}\r\n          position={{ x: 100, y: 50 }}\r\n          id="a"\r\n        />\r\n        <SelectableItem\r\n          onSelect={(selected) => onSelect("b", selected)}\r\n          selected={selected.includes("b")}\r\n          position={{ x: 200, y: 150 }}\r\n          id="b"\r\n        />\r\n        <SelectableItem\r\n          onSelect={(selected) => onSelect("c", selected)}\r\n          selected={selected.includes("c")}\r\n          position={{ x: 300, y: 75 }}\r\n          id="c"\r\n        />\r\n      </Selector>\r\n    </Display>\r\n  );\r\n}\r\n\r\nconst SelectableItem = selectable(({ selected, position }: Selectable) => {\r\n    return (\r\n      <div\r\n        style={{\r\n          position: "absolute",\r\n          left: position.x,\r\n          top: position.y,\r\n          width: 15,\r\n          height: 15,\r\n          backgroundColor: selected ? "green" : "gray",\r\n        }}\r\n      />\r\n    );\r\n  },\r\n);\n'
          }
        </_components.code>
      </_components.pre>
      {"\n"}
      <_components.h2>{"API"}</_components.h2>
      {"\n"}
      <_components.h3>{"Selector Props"}</_components.h3>
      {"\n"}
      <Properties
        properties={[
          {
            name: "parentRef",
            type: "React.RefObject<HTMLElement>",
            description: "The parent element to select elements in.",
            required: true,
          },
          {
            name: "color",
            type: "[number, number, number]",
            description: "The color of the selector.",
          },
          {
            name: "children",
            type: "React.ReactNode",
            description: "The elements to select.",
          },
        ]}
      />
    </>
  );
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  );
}
export default MDXContent;
