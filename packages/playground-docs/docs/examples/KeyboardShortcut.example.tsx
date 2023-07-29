import {
  KeyboardProvider,
  KeyboardShortcut,
} from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../components";

function KeyboardShortcutExample() {
  return (
    <KeyboardProvider>
      <KeyboardShortcut
        shortcut={{
          key: "m",
          ctrlKey: true,
        }}
        onShortcut={() => alert("CTRL+M captured")}
      />
      <small>Press CTRL+M to trigger an alert</small>
    </KeyboardProvider>
  );
}

export const metadata: ExampleMetadata = {
  name: "KeyboardShortcut",
  component: KeyboardShortcutExample,
  display: {
    padding: true,
    align: "center",
  },
};
