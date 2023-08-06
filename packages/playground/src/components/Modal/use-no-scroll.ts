import React, { useEffect } from "react";

export function useNoScroll(
  containerRef: React.RefObject<HTMLElement>,
  open: boolean,
) {
  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
      containerRef.current?.focus();
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [open]);
}
