import React, { useEffect } from "react";

import { useKeyboardShortcuts } from "./keyboard-provider";
import { Shortcut } from "./types";

import styles from "./KeyboardShortcut.module.scss";

export type KeyboardShortcutProps = {
  shortcut: Shortcut;
  onShortcut?: () => void;
};

export function KeyboardShortcut({
  shortcut,
  onShortcut,
}: KeyboardShortcutProps) {
  const { registerShortcut } = useKeyboardShortcuts();
  const callbackRef = React.useRef(onShortcut);

  useEffect(() => {
    callbackRef.current = onShortcut;
  }, [onShortcut]);

  useEffect(() => {
    if (!callbackRef.current) {
      return;
    }

    return registerShortcut(shortcut, callbackRef.current);
  }, [shortcut, registerShortcut]);

  return (
    <kbd className={styles["keyboard-shortcut"]}>{parseShortcut(shortcut)}</kbd>
  );
}

function parseShortcut(shortcut: Shortcut) {
  const parts = [];

  if (shortcut.ctrlKey) {
    parts.push("ctrl");
  }

  if (shortcut.shiftKey) {
    parts.push("shift");
  }

  if (shortcut.altKey) {
    parts.push("alt");
  }

  if (shortcut.metaKey) {
    parts.push("meta");
  }

  parts.push(shortcut.key);

  return parts.join("+");
}
