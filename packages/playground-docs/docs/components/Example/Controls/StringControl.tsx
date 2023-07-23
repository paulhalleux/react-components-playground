import { StringControl as StringControlType } from "../index";

import styles from "./SelectControl.module.scss";

type SelectControlProps = {
  control: StringControlType;
  onChange: (value: string) => void;
};

export function StringControl({ control, onChange }: SelectControlProps) {
  return (
    <input
      className={styles.example__controls__select}
      id={control.property}
      value={control.value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
