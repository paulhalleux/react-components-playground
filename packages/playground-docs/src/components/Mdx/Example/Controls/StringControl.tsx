import { StringControl as StringControlType } from "../index";

import styles from "./SelectControl.module.scss";

type SelectControlProps = {
  id: string;
  control: StringControlType;
  onChange: (value: string) => void;
};

export function StringControl({ id, control, onChange }: SelectControlProps) {
  return (
    <input
      className={styles.example__controls__select}
      id={`${control.property}-${id}`}
      value={control.value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
