import React, { PropsWithChildren, useCallback } from "react";
import { useClickAway } from "react-use";

import { BaseProps } from "../../types";
import { Popover, PopoverRef } from "../Popover";
import { PopoverPortal } from "../Popover/PopoverPortal/PopoverPortal";

import { ContextMenuProvider } from "./context-menu-context";
import { ContextMenuDivider } from "./ContextMenuDivider";
import { ContextMenuItem } from "./ContextMenuItem";
import { ContextMenuItems } from "./ContextMenuItems";
import { ContextMenuSub } from "./ContextMenuSub";
import { ContextMenuTrigger } from "./ContextMenuTrigger";

export type ContextMenuProps = PropsWithChildren<{
  /**
   * The id of the context menu.
   */
  id: string;
  /**
   * Whether to reserve space for icons in the context menu.
   */
  reserveIconsSpace?: boolean;
  /**
   * The click handler of the item.
   */
  onSelect?: (id: string, event: React.MouseEvent) => void;
  /**
   * Whether the context menu should close when an item is selected.
   */
  closeOnSelect?: boolean;
}> &
  BaseProps;

export function ContextMenu({
  children,
  reserveIconsSpace,
  onSelect,
  closeOnSelect = true,
  id,
  ...rest
}: ContextMenuProps) {
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const popoverRef = React.useRef<PopoverRef>(null);

  const Children = React.Children.toArray(children);

  const TriggerChildren = Children.filter((child) => {
    return (child as any).type === ContextMenuTrigger;
  })[0];

  useClickAway(menuRef, (event) => {
    console.log(menuRef);
    if (triggerRef.current?.contains(event.target as Node)) return;
    popoverRef.current?.close();
  });

  const onItemSelect = useCallback(
    (
      id: string | undefined,
      event: React.MouseEvent,
      onClick?: (event: React.MouseEvent) => void,
    ) => {
      if (id) {
        onSelect?.(id, event);
      } else {
        onClick?.(event);
      }

      if (closeOnSelect) {
        popoverRef.current?.close();
      }
    },
    [closeOnSelect, onSelect],
  );

  const ContextMenu = (
    <ContextMenuProvider
      id={id}
      reserveIconsSpace={reserveIconsSpace}
      onItemSelect={onItemSelect}
    >
      <ContextMenuItems reserveIconsSpace={reserveIconsSpace} {...rest}>
        {Children.filter((child) => {
          return (child as any).type !== ContextMenuTrigger;
        })}
      </ContextMenuItems>
    </ContextMenuProvider>
  );

  if (TriggerChildren === undefined) {
    return ContextMenu;
  }

  return (
    <>
      <PopoverPortal id={id} ref={menuRef} />
      <Popover
        ref={popoverRef}
        position="bottom"
        alignment="start"
        content={ContextMenu}
        trigger="click"
        closeOnClickOutside={false}
      >
        <div ref={triggerRef}>{TriggerChildren}</div>
      </Popover>
    </>
  );
}

ContextMenu.Item = ContextMenuItem;
ContextMenu.Sub = ContextMenuSub;
ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Divider = ContextMenuDivider;
