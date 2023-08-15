import { Link } from "react-router-dom";
import { Badge, Navigation } from "@paulhalleux/react-playground";

import { Logo } from "../../../../components";
import {
  ComponentDocumentations,
  HookDocumentations,
  UtilityDocumentations,
} from "../../../../utils/documentation";

import styles from "./HeaderNavigation.module.scss";

export function HeaderNavigation() {
  return (
    <div className={styles.navigation__container}>
      <Link to="/">
        <Logo />
      </Link>
      <Navigation>
        <Navigation.Link asLink href="/">
          /
        </Navigation.Link>
        <Navigation.Link asLink href="/components">
          Components
          <Badge size="small">
            {
              Object.values(ComponentDocumentations).filter(
                (v) => v.status !== "todo",
              ).length
            }
          </Badge>
        </Navigation.Link>
        <Navigation.Link asLink href="/hooks">
          Hooks
          <Badge size="small">
            {
              Object.values(HookDocumentations).filter(
                (v) => v.status !== "todo",
              ).length
            }
          </Badge>
        </Navigation.Link>
        <Navigation.Link asLink href="/utilities">
          Utilities
          <Badge size="small">
            {
              Object.values(UtilityDocumentations).filter(
                (v) => v.status !== "todo",
              ).length
            }
          </Badge>
        </Navigation.Link>
      </Navigation>
    </div>
  );
}
