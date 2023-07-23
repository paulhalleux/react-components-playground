import { SelectControl as SelectControlType } from "../index";

import styles from "./SelectControl.module.scss";

type SelectControlProps = {
  control: SelectControlType;
  onChange: (value: string) => void;
};

export function SelectControl({ control, onChange }: SelectControlProps) {
  return (
    <select
      className={styles.example__controls__select}
      id={control.property}
      value={control.value}
      onChange={(e) => onChange(e.target.value)}
    >
      {control.options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
