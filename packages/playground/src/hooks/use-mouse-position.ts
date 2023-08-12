import React, { useMemo, useState } from "react";

export function useMousePosition(): [
  number,
  number,
  (event: React.MouseEvent) => void,
] {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const bind = useMemo(
    () => (event: React.MouseEvent) => {
      setX(event.nativeEvent.offsetX);
      setY(event.nativeEvent.offsetY);
    },
    [],
  );

  return [x, y, bind];
}
