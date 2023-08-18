import {
  Badge,
  FileIcon,
  FolderIcon,
  Tree,
  TreeSize,
} from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type TreeExampleControls = {
  size: TreeSize;
};

function TreeExample({ controls }: ExampleComponentProps<TreeExampleControls>) {
  return (
    <Tree size={controls.size}>
      <Tree.Node
        id="1"
        label="Node 1"
        addonVisibility="always"
        icon={<FileIcon size={12} />}
        addon={<Badge size="small">2</Badge>}
      />
      <Tree.Node
        id="2"
        label="Node 2"
        icon={<FolderIcon size={12} />}
        addonVisibility="always"
        addon={<Badge size="small">352</Badge>}
      >
        <Tree.Node icon={<FileIcon size={12} />} id="2.1" label="Node 2.1" />
        <Tree.Node icon={<FolderIcon size={12} />} id="2.2" label="Node 2.2">
          <Tree.Node
            icon={<FileIcon size={12} />}
            id="2.2.1"
            label="Node 2.2.1"
          />
          <Tree.Node
            icon={<FileIcon size={12} />}
            id="2.2.2"
            label="Node 2.2.2"
          />
        </Tree.Node>
        <Tree.Node icon={<FileIcon size={12} />} id="2.3" label="Node 2.3" />
      </Tree.Node>
      <Tree.Node
        id="3"
        icon={<FileIcon size={12} />}
        label="Node 3"
        addonVisibility="always"
        addon={<Badge size="small">12</Badge>}
      />
      <Tree.Node
        id="4"
        icon={<FileIcon size={12} />}
        label="Node 4"
        addonVisibility="always"
        addon={<Badge size="small">23</Badge>}
      />
    </Tree>
  );
}

export const metadata: ExampleMetadata = {
  name: "Tree",
  component: TreeExample,
  display: {
    padding: true,
    align: "flex-start",
    grow: true,
  },
  controls: [
    {
      type: "select",
      label: "Size",
      property: "size",
      options: ["small", "large"],
      value: "small",
    },
  ],
};
