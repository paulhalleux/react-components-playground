import { useEffect } from "react";

import styles from "./KeyboardShortcut.module.scss";

type KeyboardShortcutProps = {
  shortcut: string;
  onShortcut?: () => void;
};

export function KeyboardShortcut({
  shortcut,
  onShortcut,
}: KeyboardShortcutProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const shortcutParts = shortcut.split("+");

      const isCtrl = shortcutParts.includes("ctrl");
      const isShift = shortcutParts.includes("shift");
      const isAlt = shortcutParts.includes("alt");
      const isMeta = shortcutParts.includes("meta");

      const isKeyPressed = shortcutParts.includes(e.key.toLowerCase());

      if (
        isKeyPressed &&
        (!isCtrl || e.ctrlKey) &&
        (!isShift || e.shiftKey) &&
        (!isAlt || e.altKey) &&
        (!isMeta || e.metaKey)
      ) {
        e.preventDefault();
        e.stopPropagation();
        onShortcut?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcut, onShortcut]);

  return <kbd className={styles["keyboard-shortcut"]}>{shortcut}</kbd>;
}
