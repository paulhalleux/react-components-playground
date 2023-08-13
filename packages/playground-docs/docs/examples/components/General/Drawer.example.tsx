import { useState } from "react";
import { Button, Drawer } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../../src/components/Mdx/Example";

import styles from "./Modal.example.module.scss";

function DrawerExample() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<"small" | "medium" | "large" | "full">(
    "medium",
  );
  const [position, setPosition] = useState<"left" | "right">("right");

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        position={position}
      >
        <Drawer.Header closeable>
          <h2>Drawer header</h2>
        </Drawer.Header>
        <Drawer.Body>
          <div>Change size</div>
          <select value={size} onChange={(e) => setSize(e.target.value as any)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="full">Full</option>
          </select>
          <div>Change position</div>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value as any)}
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </Drawer.Body>
        <Drawer.Footer className={styles.footer}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
}

export const metadata: ExampleMetadata = {
  name: "Drawer",
  component: DrawerExample,
  display: {
    padding: true,
    align: "center",
  },
};
