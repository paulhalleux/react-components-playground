import { ReactNode, useRef } from "react";
import clsx from "clsx";

import { ChevronRightIcon } from "../../Icons";
import { Popover, PopoverRef, PopoverTrigger } from "../../Popover";
import { useContextMenu } from "../context-menu-context";
import { ContextMenu } from "../ContextMenu";
import { ContextMenuItemProps } from "../ContextMenuItem";
import { ContextMenuItems } from "../ContextMenuItems";

import styles from "../ContextMenu.module.scss";

export type ContextMenuSubProps = Omit<
  ContextMenuItemProps,
  "onClick" | "unselectable"
> & {
  /**
   * The label of the sub menu.
   */
  label?: ReactNode;
  /**
   * The trigger of the sub menu.
   */
  trigger?: PopoverTrigger;
};

export function ContextMenuSub({
  children,
  label,
  trigger = "hover",
  variant = "default",
  addon,
  className,
  ...rest
}: ContextMenuSubProps) {
  const popoverRef = useRef<PopoverRef>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);

  const { reserveIconsSpace, id } = useContextMenu();

  return (
    <div
      ref={subMenuRef}
      className={clsx(styles["context-menu__sub__container"], className)}
      {...rest}
    >
      <Popover
        ref={popoverRef}
        content={
          <ContextMenuItems reserveIconsSpace={reserveIconsSpace}>
            {children}
          </ContextMenuItems>
        }
        trigger={trigger}
        position="right"
        alignment="start"
        style={{ zIndex: 100 }}
        closeOnClickOutside={false}
        usePortal
        portalId={id}
      >
        <div style={{ position: "relative" }}>
          <ContextMenu.Item
            variant={variant}
            addon={addon}
            unselectable
            className={styles["context-menu__sub__label"]}
          >
            {label} <ChevronRightIcon width={18} height={18} />
          </ContextMenu.Item>
        </div>
      </Popover>
    </div>
  );
}
