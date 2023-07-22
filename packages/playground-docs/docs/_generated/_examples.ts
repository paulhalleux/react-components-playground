import { default as Selector } from "../examples/Selector.example";
import { default as KeyframePath } from "../examples/KeyframePath.example";
import { default as FrameSelector } from "../examples/FrameSelector.example";
import { default as Badge } from "../examples/Badge.example";
import { default as TableSimpleTable } from "../examples/Table/SimpleTable.example";
import { default as TableCustomRendering } from "../examples/Table/CustomRendering.example";

export const Examples = {
	Selector,
	Badge,
	KeyframePath,
	FrameSelector,
	TableCustomRendering,
	TableSimpleTable,
};

export const Sources = {
	Selector: `import { useRef, useState } from "react";
import {
  Selectable,
  selectable,
  Selector,
} from "@paulhalleux/react-playground";

import { useTheme } from "../../src/contexts/theme-context";
import { Display } from "../components";

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
    <Display ref={containerRef}>
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
    </Display>
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

export default {
  name: "Selector",
  component: SelectorExample,
};
`,
	Badge: `import { Badge } from "@paulhalleux/react-playground";

import { Display, ExampleProps } from "../components";

const GroupStyle = {
  display: "flex",
  gap: 24,
  alignItems: "center",
};

function BadgeExample({ pill }: ExampleProps & { pill?: boolean }) {
  return (
    <Display padding={24} align="center" direction="column">
      <div style={GroupStyle}>
        <Badge pill={pill} size="small">
          Default
        </Badge>
        <Badge pill={pill} size="small" variant="primary">
          Primary
        </Badge>
        <Badge pill={pill} size="small" variant="secondary">
          Secondary
        </Badge>
      </div>
      <div style={GroupStyle}>
        <Badge pill={pill} size="medium">
          Default
        </Badge>
        <Badge pill={pill} size="medium" variant="primary">
          Primary
        </Badge>
        <Badge pill={pill} size="medium" variant="secondary">
          Secondary
        </Badge>
      </div>
      <div style={GroupStyle}>
        <Badge pill={pill} size="large">
          Default
        </Badge>
        <Badge pill={pill} size="large" variant="primary">
          Primary
        </Badge>
        <Badge pill={pill} size="large" variant="secondary">
          Secondary
        </Badge>
      </div>
    </Display>
  );
}

export default {
  name: "Badge",
  component: BadgeExample,
};
`,
	KeyframePath: `import { useRef, useState } from "react";
import { Keyframe, KeyframePath } from "@paulhalleux/react-playground";

import { ThemeType, useTheme } from "../../src/contexts/theme-context";
import { Display } from "../components";

function KeyframePathExample() {
  const { theme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedKeyframes, setSelectedKeyframes] = useState<number[]>([]);
  const [keyframes, setKeyframes] = useState<Keyframe[]>([
    { position: { x: 100, y: 50 }, time: 1 },
    { position: { x: 200, y: 150 }, time: 2 },
    { position: { x: 300, y: 75 }, time: 3 },
  ]);

  const onKeyframeChange = (keyframe: number, partial: Partial<Keyframe>) =>
    setKeyframes((prev) => {
      const next = [...prev];
      next[keyframe] = { ...next[keyframe], ...partial };
      return next;
    });

  const onReset = () => {
    setKeyframes([
      { position: { x: 100, y: 50 }, time: 1 },
      { position: { x: 200, y: 150 }, time: 2 },
      { position: { x: 300, y: 75 }, time: 3 },
    ]);
    setSelectedKeyframes([]);
  };

  return (
    <Display ref={containerRef} onReset={onReset}>
      <KeyframePath
        parentRef={containerRef}
        keyframes={keyframes}
        onKeyframeChange={onKeyframeChange}
        enablePathMove
        enableBezier
        selectedKeyframes={selectedKeyframes}
        onKeyframeSelect={setSelectedKeyframes}
        pathColor={theme === ThemeType.Light ? [0, 0, 0] : [255, 255, 255]}
      />
    </Display>
  );
}

export default {
  name: "KeyframePath",
  component: KeyframePathExample,
};
`,
	FrameSelector: `import { useEffect, useRef, useState } from "react";
import {
  CrossHead,
  FrameSelector,
  Point,
  Size,
} from "@paulhalleux/react-playground";

import { ThemeType, useTheme } from "../../src/contexts/theme-context";
import { Display } from "../components";

function FrameSelectorExample() {
  const { theme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [size, setSize] = useState<Size>({ width: 50, height: 50 });

  useEffect(() => {
    const { current } = containerRef;
    if (!current) return;

    const { width, height } = current.getBoundingClientRect();
    setPosition({
      x: width / 2 - size.width / 2,
      y: height / 2 - size.height / 2,
    });
  }, [containerRef]);

  const onReset = () => {
    const { current } = containerRef;
    if (!current) return;

    const { width, height } = current.getBoundingClientRect();
    setSize({ width: 50, height: 50 });
    setPosition({
      x: width / 2 - 50 / 2,
      y: height / 2 - 50 / 2,
    });
  };

  return (
    <Display ref={containerRef} onReset={onReset}>
      <FrameSelector
        parentRef={containerRef}
        color={theme === ThemeType.Light ? [0, 0, 0] : [255, 255, 255]}
        position={position}
        onPositionChange={setPosition}
        size={size}
        onSizeChange={setSize}
        maxSize={{ width: 75, height: 75 }}
        minSize={{ width: 25, height: 25 }}
      >
        <CrossHead />
      </FrameSelector>
    </Display>
  );
}

export default {
  name: "FrameSelector",
  component: FrameSelectorExample,
};
`,
	TableCustomRendering: `import { ArrowRightIcon, Table } from "@paulhalleux/react-playground";

import { Display } from "../../components";

type Person = {
  id: number;
  name: string;
  age: number;
};

function CustomRenderingExample() {
  return (
    <Display padding={24} align="center">
      <Table<Person>
        columns={[
          { key: "id", label: "ID", width: 100 },
          {
            key: "name",
            label: "Name",
            sortable: true,
            sortFn: sortName,
            width: 200,
            renderHeader: (label) => (
              <span style={{ textDecoration: "underline" }}>{label}</span>
            ),
            render: (value) => (
              <span
                style={{
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <ArrowRightIcon width={16} height={16} />
                {value}
              </span>
            ),
          },
          { key: "age", label: "Age", width: 100 },
        ]}
        data={[
          { id: 1, name: "Paul", age: 30 },
          { id: 2, name: "John", age: 40 },
          { id: 3, name: "Jane", age: 50 },
        ]}
      />
    </Display>
  );
}

function sortName(a: Person, b: Person, sort: "asc" | "desc" | null) {
  if (sort === "asc") {
    return a.name.localeCompare(b.name);
  } else if (sort === "desc") {
    return b.name.localeCompare(a.name);
  } else {
    return 0;
  }
}

export default {
  name: "CustomRendering",
  component: CustomRenderingExample,
};
`,
	TableSimpleTable: `import { Table } from "@paulhalleux/react-playground";

import { Display } from "../../components";

type Person = {
  id: number;
  name: string;
  age: number;
};

function SimpleTableExample() {
  return (
    <Display padding={24} align="center">
      <Table<Person>
        columns={[
          { key: "id", label: "ID", width: 100 },
          {
            key: "name",
            label: "Name",
            sortable: true,
            sortFn: sortName,
            width: 200,
          },
          { key: "age", label: "Age", width: 100 },
        ]}
        data={[
          { id: 1, name: "Paul", age: 30 },
          { id: 2, name: "John", age: 40 },
          { id: 3, name: "Jane", age: 50 },
        ]}
      />
    </Display>
  );
}

function sortName(a: Person, b: Person, sort: "asc" | "desc" | null) {
  if (sort === "asc") {
    return a.name.localeCompare(b.name);
  } else if (sort === "desc") {
    return b.name.localeCompare(a.name);
  } else {
    return 0;
  }
}

export default {
  name: "SimpleTable",
  component: SimpleTableExample,
};
`,
};