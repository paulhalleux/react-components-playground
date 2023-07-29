import React, { createContext, useContext, useEffect, useState } from "react";

import { Shortcut } from "./types";

type RegisterFn = (shortcut: Shortcut, callback: () => void) => () => void;
type RegisteredShortcut = Shortcut & { callback: () => void };

type KeyboardContextType = {
  shortcuts: RegisteredShortcut[];
  registerShortcut: RegisterFn;
};

const defaultValue: KeyboardContextType = {
  shortcuts: [],
  registerShortcut: () => () => {},
};

const KeyboardContext = createContext(defaultValue);

export function KeyboardProvider({ children }: { children: React.ReactNode }) {
  const [registeredShortcuts, setRegisteredShortcuts] = useState<
    RegisteredShortcut[]
  >([]);

  const registerShortcut: RegisterFn = (shortcut, callback) => {
    const shortcutWithCallback = { ...shortcut, callback };
    setRegisteredShortcuts((shortcuts) => [...shortcuts, shortcutWithCallback]);
    return () => {
      setRegisteredShortcuts((shortcuts) =>
        shortcuts.filter((s) => s !== shortcutWithCallback),
      );
    };
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const shortcut = registeredShortcuts.find((s) =>
        isShortcutMatch(s, event),
      );

      if (shortcut) {
        event.preventDefault();
        event.stopPropagation();

        shortcut.callback();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [registeredShortcuts]);

  return (
    <KeyboardContext.Provider
      value={{
        shortcuts: registeredShortcuts,
        registerShortcut,
      }}
    >
      {children}
    </KeyboardContext.Provider>
  );
}

export function useKeyboardShortcuts() {
  return useContext(KeyboardContext);
}

function isShortcutMatch(shortcut: Shortcut, event: KeyboardEvent) {
  return (
    shortcut.key === event.key &&
    !!shortcut.ctrlKey === event.ctrlKey &&
    !!shortcut.shiftKey === event.shiftKey &&
    !!shortcut.altKey === event.altKey &&
    !!shortcut.metaKey === event.metaKey
  );
}
