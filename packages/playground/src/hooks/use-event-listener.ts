import { useEffect, useRef } from "react";

export function useEventListener(
  eventName: string,
  handler: (event: any) => void,
  element: HTMLElement | Window = window,
) {
  const savedHandler = useRef<(event: Event) => void>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = element;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    const eventListener = (event: Event) => {
      if (savedHandler?.current) {
        savedHandler.current(event);
      }
    };

    targetElement.addEventListener(eventName, eventListener);
    return () => targetElement.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
}
