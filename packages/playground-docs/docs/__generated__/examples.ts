import { default as Toast } from "../examples/Toast.example";
import { default as Selector } from "../examples/Selector.example";
import { default as KeyframePath } from "../examples/KeyframePath.example";
import { default as FrameSelector } from "../examples/FrameSelector.example";
import { default as CodeBlock } from "../examples/CodeBlock.example";
import { default as Badge } from "../examples/Badge.example";
import { default as TabsSpaced } from "../examples/Tabs/Spaced.example";
import { default as TabsHorizontal } from "../examples/Tabs/Horizontal.example";
import { default as TabsCompact } from "../examples/Tabs/Compact.example";
import { default as TableSimpleTable } from "../examples/Table/SimpleTable.example";
import { default as TableCustomRendering } from "../examples/Table/CustomRendering.example";

export const Examples = {
	Selector,
	KeyframePath,
	Toast,
	Badge,
	TabsSpaced,
	CodeBlock,
	FrameSelector,
	TabsHorizontal,
	TabsCompact,
	TableCustomRendering,
	TableSimpleTable,
};

export const ExamplesSources = {
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
	Toast: `import { Button, useToaster } from "@paulhalleux/react-playground";

import { Display, ExampleComponentProps, ExampleMetadata } from "../components";

type ToastExampleControls = {
  title: string;
  content: string;
  closable: boolean;
  action: boolean;
};

function ToastExample({
  controls,
}: ExampleComponentProps<ToastExampleControls>) {
  const { pushToast } = useToaster();

  const onClick = () => {
    pushToast({
      type: "primary",
      duration: 5000,
      actionLabel: controls.action ? "Action" : undefined,
      onAction: () => alert("Action Clicked"),
      ...controls,
    });
  };

  return (
    <Display padding={24} align="center" direction="column">
      <Button onClick={onClick}>Send Toast</Button>
    </Display>
  );
}

export default {
  name: "Toast",
  component: ToastExample,
  controls: [
    { type: "string", label: "Title", property: "title", value: "Toast Title" },
    {
      type: "string",
      label: "Content",
      property: "content",
      value: "Toast Content",
    },
    {
      type: "boolean",
      label: "Closable",
      property: "closable",
      value: true,
    },
    {
      type: "boolean",
      label: "Action",
      property: "action",
      value: true,
    },
  ],
} as ExampleMetadata;
`,
	Badge: `import { Badge } from "@paulhalleux/react-playground";

import { Display, ExampleComponentProps } from "../components";

const GroupStyle = {
  display: "flex",
  gap: 24,
  alignItems: "center",
};

type BadgeExampleControls = {
  variant: "default" | "primary" | "secondary" | "warning";
  pill: "badge" | "pill";
};

function BadgeExample({
  controls,
}: ExampleComponentProps<BadgeExampleControls>) {
  return (
    <Display padding={24} align="center" direction="column">
      <div style={GroupStyle}>
        <Badge size="small" {...controls} pill={controls.pill === "pill"}>
          Badge content
        </Badge>
      </div>
      <div style={GroupStyle}>
        <Badge size="medium" {...controls} pill={controls.pill === "pill"}>
          Badge content
        </Badge>
      </div>
      <div style={GroupStyle}>
        <Badge size="large" {...controls} pill={controls.pill === "pill"}>
          Badge content
        </Badge>
      </div>
    </Display>
  );
}

export default {
  name: "Badge",
  component: BadgeExample,
  controls: [
    {
      label: "Status",
      type: "select",
      property: "variant",
      options: ["default", "primary", "secondary", "warning"],
    },
    {
      label: "Type",
      type: "select",
      property: "pill",
      options: ["badge", "pill"],
    },
  ],
};
`,
	TabsSpaced: `import { Tabs } from "@paulhalleux/react-playground";

import { Display } from "../../components";

const ContentStyle = {
  padding: 12,
  backgroundColor: "rgb(var(--color-main-light), .2)",
  border: "1px solid rgb(var(--color-border))",
  borderRadius: 4,
  height: "100%",
  flexGrow: 1,
};

function SpacedExample() {
  return (
    <Display padding={24}>
      <Tabs orientation="vertical" layout="spaced">
        <Tabs.Tab id="tab1" label="Tab 1">
          <p style={ContentStyle}>Tab 1 content</p>
        </Tabs.Tab>
        <Tabs.Tab id="tab2" label="Tab 2">
          <p style={ContentStyle}>Tab 2 content</p>
        </Tabs.Tab>
        <Tabs.Tab id="tab3" label="Tab 3">
          <p style={ContentStyle}>Tab 3 content</p>
        </Tabs.Tab>
      </Tabs>
    </Display>
  );
}

export default {
  name: "Spaced",
  component: SpacedExample,
};
`,
	CodeBlock: `import { CodeBlock } from "@paulhalleux/react-playground";

import { Display } from "../components";

function CodeBlockExample() {
  const code = \`import { CodeBlock } from "@paulhalleux/react-playground";
  
import { Display } from "../components";

const ContentStyle = {
  padding: 12,
  backgroundColor: "rgb(var(--color-main-light), .2)",
  border: "1px solid rgb(var(--color-border))",
  borderRadius: 4,
  height: "100%",
  flexGrow: 1
};

function CodeBlockExample() {
  return (
    <Display padding={24}>
      <CodeBlock>
        {ContentStyle}
      </CodeBlock>
    </Display>
  );
}\`;

  return (
    <Display padding={24} grow>
      <CodeBlock language="tsx">{code}</CodeBlock>
    </Display>
  );
}

export default {
  name: "CodeBlock",
  component: CodeBlockExample,
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
	TabsHorizontal: `import { Tabs } from "@paulhalleux/react-playground";

import { Display } from "../../components";

const ContentStyle = {
  padding: 12,
  backgroundColor: "rgb(var(--color-main-light), .2)",
  border: "1px solid rgb(var(--color-border))",
  borderRadius: 4,
  height: "100%",
  flexGrow: 1,
};

function HorizontalExample() {
  return (
    <Display padding={24}>
      <Tabs orientation="horizontal">
        <Tabs.Tab id="tab1" label="Tab 1">
          <p style={ContentStyle}>Tab 1 content</p>
        </Tabs.Tab>
        <Tabs.Tab id="tab2" label="Tab 2">
          <p style={ContentStyle}>Tab 2 content</p>
        </Tabs.Tab>
        <Tabs.Tab id="tab3" label="Tab 3">
          <p style={ContentStyle}>Tab 3 content</p>
        </Tabs.Tab>
      </Tabs>
    </Display>
  );
}

export default {
  name: "Horizontal",
  component: HorizontalExample,
};
`,
	TabsCompact: `import { Tabs } from "@paulhalleux/react-playground";

import { Display } from "../../components";

const ContentStyle = {
  padding: 12,
  backgroundColor: "rgb(var(--color-main-light), .2)",
  border: "1px solid rgb(var(--color-border))",
  borderRadius: "0 4px 4px 4px",
  height: "100%",
  flexGrow: 1,
};

function CompactExample() {
  return (
    <Display padding={24}>
      <Tabs orientation="vertical" layout="compact">
        <Tabs.Tab id="tab1" label="Tab 1">
          <p style={ContentStyle}>Tab 1 content</p>
        </Tabs.Tab>
        <Tabs.Tab id="tab2" label="Tab 2">
          <p style={ContentStyle}>Tab 2 content</p>
        </Tabs.Tab>
        <Tabs.Tab id="tab3" label="Tab 3">
          <p style={ContentStyle}>Tab 3 content</p>
        </Tabs.Tab>
      </Tabs>
    </Display>
  );
}

export default {
  name: "Compact",
  component: CompactExample,
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