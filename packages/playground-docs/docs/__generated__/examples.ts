import * as Toast from "../examples/Toast.example";
import * as Selector from "../examples/Selector.example";
import * as KeyframePath from "../examples/KeyframePath.example";
import * as FrameSelector from "../examples/FrameSelector.example";
import * as CodeBlock from "../examples/CodeBlock.example";
import * as Badge from "../examples/Badge.example";
import * as TabsSpaced from "../examples/Tabs/Spaced.example";
import * as TabsHorizontal from "../examples/Tabs/Horizontal.example";
import * as TabsCompact from "../examples/Tabs/Compact.example";
import * as TableSimpleTable from "../examples/Table/SimpleTable.example";
import * as TableCustomRendering from "../examples/Table/CustomRendering.example";

export const Examples = {
	Toast,
	Selector,
	KeyframePath,
	CodeBlock,
	Badge,
	FrameSelector,
	TabsSpaced,
	TableSimpleTable,
	TableCustomRendering,
	TabsHorizontal,
	TabsCompact,
};

export const ExamplesSources = {
	Toast: `import {
  Button,
  ToasterProvider,
  useToaster,
} from "@paulhalleux/react-playground";

import { ExampleComponentProps, ExampleMetadata } from "../components";

type ToastExampleControls = {
  title: string;
  content: string;
  closable: boolean;
  action: boolean;
  replace: boolean;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

function ToastExampleWrapper({
  controls,
}: ExampleComponentProps<ToastExampleControls>) {
  return (
    <ToasterProvider replace={controls.replace} position={controls.position}>
      <ToastExample controls={controls} />
    </ToasterProvider>
  );
}

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

  return <Button onClick={onClick}>Send Toast</Button>;
}

export const metadata: ExampleMetadata = {
  name: "Toast",
  component: ToastExampleWrapper,
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
    {
      type: "boolean",
      label: "Replace",
      property: "replace",
      value: false,
    },
    {
      type: "select",
      label: "Position",
      property: "position",
      value: "top-right",
      options: ["top-left", "top-right", "bottom-left", "bottom-right"],
    },
  ],
  display: {
    padding: true,
    align: "center",
  },
};
`,
	Selector: `import { useRef, useState } from "react";
import {
  Selectable,
  selectable,
  Selector,
} from "@paulhalleux/react-playground";

import { useTheme } from "../../../playground/src/theme/theme-context";
import { ExampleMetadata } from "../components";

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
`,
	KeyframePath: `import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Keyframe, KeyframePath } from "@paulhalleux/react-playground";

import {
  ThemeType,
  useTheme,
} from "../../../playground/src/theme/theme-context";
import { ExampleMetadata, ExampleRef } from "../components";

export const KeyframePathExample = forwardRef<ExampleRef>(({}, ref) => {
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

  useImperativeHandle(
    ref,
    () => ({
      reset: onReset,
    }),
    [onReset],
  );

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
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
    </div>
  );
});

export const metadata: ExampleMetadata = {
  name: "KeyframePath",
  component: KeyframePathExample,
};
`,
	CodeBlock: `import { CodeBlock } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../components";

function CodeBlockExample() {
  const code = \`import { CodeBlock } from "@paulhalleux/react-playground";
  
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
    <CodeBlock>
      {ContentStyle}
    </CodeBlock>
  );
}\`;

  return <CodeBlock language="tsx">{code}</CodeBlock>;
}

export const metadata: ExampleMetadata = {
  name: "CodeBlock",
  component: CodeBlockExample,
  display: {
    padding: true,
    grow: true,
  },
};
`,
	Badge: `import { Badge } from "@paulhalleux/react-playground";

import { ExampleComponentProps, ExampleMetadata } from "../components";

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
    <>
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
    </>
  );
}

export const metadata: ExampleMetadata = {
  name: "Badge",
  component: BadgeExample,
  controls: [
    {
      label: "Status",
      type: "select",
      value: "default",
      property: "variant",
      options: [
        "default",
        "primary",
        "secondary",
        "warning",
        "danger",
        "success",
        "info",
        "ghost",
      ],
    },
    {
      label: "Type",
      type: "select",
      value: "badge",
      property: "pill",
      options: ["badge", "pill"],
    },
    {
      label: "Closeable",
      type: "boolean",
      value: false,
      property: "closeable",
    },
  ],
  display: {
    padding: true,
    align: "center",
    direction: "column",
  },
};
`,
	FrameSelector: `import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  CrossHead,
  FrameSelector,
  Point,
  Size,
} from "@paulhalleux/react-playground";

import {
  ThemeType,
  useTheme,
} from "../../../playground/src/theme/theme-context";
import { ExampleMetadata, ExampleRef } from "../components";

const FrameSelectorExample = forwardRef<ExampleRef>(({}, ref) => {
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

  useImperativeHandle(
    ref,
    () => ({
      reset: onReset,
    }),
    [onReset],
  );

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
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
    </div>
  );
});

export const metadata: ExampleMetadata = {
  name: "FrameSelector",
  component: FrameSelectorExample,
};
`,
	TabsSpaced: `import { Tabs } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../components";

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
  );
}

export const metadata: ExampleMetadata = {
  name: "Spaced",
  component: SpacedExample,
  display: {
    padding: true,
  },
};
`,
	TableSimpleTable: `import { Table } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../components";

type Person = {
  id: number;
  name: string;
  age: number;
};

function SimpleTableExample() {
  return (
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

export const metadata: ExampleMetadata = {
  name: "SimpleTable",
  component: SimpleTableExample,
  display: {
    padding: true,
    align: "center",
  },
};
`,
	TableCustomRendering: `import { ArrowRightIcon, Table } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../components";

type Person = {
  id: number;
  name: string;
  age: number;
};

function CustomRenderingExample() {
  return (
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

export const metadata: ExampleMetadata = {
  name: "CustomRendering",
  component: CustomRenderingExample,
  display: {
    padding: true,
    align: "center",
  },
};
`,
	TabsHorizontal: `import { Tabs } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../components";

function HorizontalExample() {
  return (
    <Tabs orientation="horizontal" addButton>
      <Tabs.Tab contained id="tab1" label="Tab 1" closeable>
        <p style={{ padding: 12 }}>Tab 1 content</p>
      </Tabs.Tab>
      <Tabs.Tab contained id="tab2" label="Tab 2" disabled closeable>
        <p style={{ padding: 12 }}>Tab 2 content</p>
      </Tabs.Tab>
      <Tabs.Tab contained id="tab3" label="Tab 3" closeable closeDisabled>
        <p style={{ padding: 12 }}>Tab 3 content</p>
      </Tabs.Tab>
    </Tabs>
  );
}

export const metadata: ExampleMetadata = {
  name: "Horizontal",
  component: HorizontalExample,
  display: {
    padding: true,
  },
};
`,
	TabsCompact: `import { Tabs } from "@paulhalleux/react-playground";

import { ExampleComponentProps, ExampleMetadata } from "../../components";

const ContentStyle = {
  padding: 12,
  backgroundColor: "rgb(var(--color-main-light), .2)",
  border: "1px solid rgb(var(--color-border))",
  borderRadius: "0 4px 4px 4px",
  height: "100%",
  flexGrow: 1,
};

export type CompactExampleControls = {
  addButton: boolean;
  closeable: boolean;
};

function CompactExample({
  controls,
}: ExampleComponentProps<CompactExampleControls>) {
  return (
    <Tabs orientation="vertical" layout="compact" {...controls}>
      <Tabs.Tab id="tab1" label="Tab 1" closeable={controls.closeable}>
        <p style={ContentStyle}>Tab 1 content</p>
      </Tabs.Tab>
      <Tabs.Tab id="tab2" label="Tab 2" closeable={controls.closeable}>
        <p style={ContentStyle}>Tab 2 content</p>
      </Tabs.Tab>
      <Tabs.Tab id="tab3" label="Tab 3" closeable={controls.closeable}>
        <p style={ContentStyle}>Tab 3 content</p>
      </Tabs.Tab>
    </Tabs>
  );
}

export const metadata: ExampleMetadata = {
  name: "Compact",
  component: CompactExample,
  display: {
    padding: true,
  },
  controls: [
    {
      label: "Add button",
      type: "boolean",
      value: true,
      property: "addButton",
    },
    {
      label: "Closeable",
      type: "boolean",
      value: false,
      property: "closeable",
    },
  ],
};
`,
};