import { NumberControl as NumberControlType } from "../index";

import styles from "./SelectControl.module.scss";

type SelectControlProps = {
  id: string;
  control: NumberControlType;
  onChange: (value: string) => void;
};

export function NumberControl({ id, control, onChange }: SelectControlProps) {
  return (
    <input
      className={styles.example__controls__select}
      id={`${control.property}-${id}`}
      value={control.value}
      type="number"
      min={control.min}
      max={control.max}
      step={control.step}
      onChange={(e) => onChange(parseInt(e.target.value || "0", 10))}
    />
  );
}
