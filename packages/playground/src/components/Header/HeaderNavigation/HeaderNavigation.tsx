import { PropsWithChildren } from "react";

import { BaseProps } from "../../../types";
import { Navigation } from "../../Navigation";

export type HeaderNavigationProps = PropsWithChildren & BaseProps;

export function HeaderNavigation({ children, ...rest }: HeaderNavigationProps) {
  return <Navigation {...rest}>{children}</Navigation>;
}
