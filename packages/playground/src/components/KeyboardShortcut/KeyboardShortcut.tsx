import React, { useEffect } from "react";

import { BaseProps } from "../../types";

import { useKeyboardShortcuts } from "./keyboard-provider";
import { Shortcut } from "./types";

import styles from "./KeyboardShortcut.module.scss";

export type KeyboardShortcutProps = {
  /**
   * The shortcut to display.
   */
  shortcut: Shortcut;
  /**
   * The callback to call when the shortcut is pressed.
   */
  onShortcut?: () => void;
} & BaseProps;

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
