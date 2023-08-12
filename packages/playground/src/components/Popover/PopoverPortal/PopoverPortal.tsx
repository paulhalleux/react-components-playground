import { ForwardedRef, forwardRef } from "react";

type PopoverPortalProps = {
  /**
   * The id of the portal.
   */
  id: string;
};

function PopoverPortal(
  { id }: PopoverPortalProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return <div ref={ref} id={`popover-portal-${id}`} />;
}

const ForwardedPopoverPortal = forwardRef(PopoverPortal);
export { ForwardedPopoverPortal as PopoverPortal };
