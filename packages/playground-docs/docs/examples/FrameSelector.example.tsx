import {
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
  ThemeType,
  useTheme,
} from "@paulhalleux/react-playground";

import { ExampleMetadata, ExampleRef } from "../../src/components/Mdx/Example";

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
