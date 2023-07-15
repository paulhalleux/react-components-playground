# React Frame Selector

A frame selector component for React.
Select a size and position with a draggable and resizable frame. 

### Screenshots

| Selector                       | ResizeHandle                                  |
|:-------------------------------|-----------------------------------------------|
| ![Screenshot](./assets/base.png) | ![Screenshot 2](./assets/resize.png) | 


### Usage

```tsx
export function App() {
  const [size, setSize] = useState<Size>({ width: 100, height: 100 });
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null); 
   
  return (
    <div className={styles.frame__container} ref={containerRef}>
      <FrameSelector
        parentRef={containerRef}
        size={size}
        onSizeChange={setSize}
        position={position}
        onPositionChange={setPosition}
        color={[32, 58, 75]}
      />
    </div>
  );
}