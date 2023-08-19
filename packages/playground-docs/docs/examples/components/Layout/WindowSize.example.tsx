import * as React from "react";
import { createPortal } from "react-dom";
import { WindowSize } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../../src/components/Mdx/Example";

function WindowSizeExample() {
  const [iframe, setIframe] = React.useState<HTMLIFrameElement | null>(null);
  const container = iframe?.contentWindow?.document.body;

  return (
    <div
      style={{
        resize: "both",
        overflow: "auto",
        border: "1px solid rgba(var(--color-border))",
      }}
    >
      <iframe
        ref={setIframe}
        id="frame"
        style={{ width: "100%", height: "100%" }}
        frameBorder={0}
      >
        {container &&
          createPortal(
            <>
              <WindowSize windowElement={iframe.contentWindow} minWidth={200}>
                <div style={{ backgroundColor: "red" }}>
                  Minimum width: 200px
                </div>
              </WindowSize>
              <WindowSize windowElement={iframe.contentWindow} maxWidth={200}>
                <div style={{ backgroundColor: "blue" }}>
                  Maximum width: 200px
                </div>
              </WindowSize>
            </>,
            container,
          )}
      </iframe>
    </div>
  );
}

export const metadata: ExampleMetadata = {
  name: "Window Size",
  component: WindowSizeExample,
  display: {
    padding: true,
    align: "center",
  },
};
