import { Divider } from "../../Divider";

import styles from "./ContextMenuDivider.module.scss";

export function ContextMenuDivider() {
  return <Divider orientation="horizontal" className={styles.divider} />;
}
