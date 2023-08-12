import {
  Button,
  CleanIcon,
  ContextMenu,
  InfoIcon,
  PlusIcon,
} from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../../src/components/Mdx/Example";

function ContextMenuExample() {
  return (
    <ContextMenu reserveIconsSpace>
      <ContextMenu.Trigger>
        <Button>Open context menu</Button>
      </ContextMenu.Trigger>
      <ContextMenu.Item addon={<CleanIcon height={14} width={14} />}>
        Item 1
      </ContextMenu.Item>
      <ContextMenu.Item>Item 2</ContextMenu.Item>
      <ContextMenu.Item>Item 3</ContextMenu.Item>
      <ContextMenu.Divider />
      <ContextMenu.Sub addon={<PlusIcon />} label="Sub menu">
        <ContextMenu.Item>Item 1</ContextMenu.Item>
        <ContextMenu.Item>Item 2</ContextMenu.Item>
        <ContextMenu.Item>Item 3</ContextMenu.Item>
        <ContextMenu.Sub
          addon={<InfoIcon height={14} width={14} />}
          label="Sub menu"
          variant="danger"
        >
          <ContextMenu.Item>Item 1</ContextMenu.Item>
          <ContextMenu.Item>Item 2</ContextMenu.Item>
          <ContextMenu.Item>Item 3</ContextMenu.Item>
        </ContextMenu.Sub>
      </ContextMenu.Sub>
    </ContextMenu>
  );
}

export const metadata: ExampleMetadata = {
  name: "Context Menu",
  component: ContextMenuExample,
  display: {
    padding: true,
    align: "center",
  },
};
