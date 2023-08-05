import { useState } from "react";
import { Button, Modal } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../src/components/Mdx/Example";

import styles from "./Modal.example.module.scss";

function ModalExample() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<"small" | "medium" | "large" | "full">(
    "medium",
  );

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} size={size}>
        <Modal.Header closeable>
          <h2>Modal header</h2>
        </Modal.Header>
        <Modal.Body>
          <div>Change size</div>
          <select value={size} onChange={(e) => setSize(e.target.value as any)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="full">Full</option>
          </select>
        </Modal.Body>
        <Modal.Footer className={styles.footer}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export const metadata: ExampleMetadata = {
  name: "Modal",
  component: ModalExample,
  display: {
    padding: true,
    align: "center",
  },
};
