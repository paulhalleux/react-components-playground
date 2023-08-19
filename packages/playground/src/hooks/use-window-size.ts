import { useEffect, useState } from "react";

export function useWindowSize(windowElement: Window = window) {
  const [size, setSize] = useState({
    width: windowElement.innerWidth,
    height: windowElement.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: windowElement.innerWidth,
        height: windowElement.innerHeight,
      });
    };

    windowElement.addEventListener("resize", handleResize);

    return () => {
      windowElement.removeEventListener("resize", handleResize);
    };
  }, [windowElement]);

  return size;
}
