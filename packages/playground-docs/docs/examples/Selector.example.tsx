import { useRef, useState } from "react";
import {
  Selectable,
  selectable,
  Selector,
  useTheme,
} from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../src/components/Mdx/Example";

function SelectorExample() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const onSelect = (id: string, selected: boolean) => {
    if (selected) {
      setSelected((prev) => [...prev, id]);
    } else {
      setSelected((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Selector
        parentRef={containerRef}
        color={theme === "light" ? [0, 0, 0] : [255, 255, 255]}
      >
        <SelectableItem
          onSelect={(selected) => onSelect("a", selected)}
          selected={selected.includes("a")}
          position={{ x: 100, y: 50 }}
          id="a"
        />
        <SelectableItem
          onSelect={(selected) => onSelect("b", selected)}
          selected={selected.includes("b")}
          position={{ x: 200, y: 150 }}
          id="b"
        />
        <SelectableItem
          onSelect={(selected) => onSelect("c", selected)}
          selected={selected.includes("c")}
          position={{ x: 300, y: 75 }}
          id="c"
        />
      </Selector>
    </div>
  );
}

const SelectableItem = selectable<Selectable>(
  ({ selected, position }: Selectable) => {
    return (
      <div
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          width: 15,
          height: 15,
          backgroundColor: selected ? "green" : "gray",
        }}
      ></div>
    );
  },
);

export const metadata: ExampleMetadata = {
  name: "Selector",
  component: SelectorExample,
};
