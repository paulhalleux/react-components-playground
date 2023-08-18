import { Input } from "@paulhalleux/react-playground";

import { NumberControl as NumberControlType } from "../index";

import styles from "./SelectControl.module.scss";

type SelectControlProps = {
  id: string;
  control: NumberControlType;
  onChange: (value: number) => void;
};

export function NumberControl({ id, control, onChange }: SelectControlProps) {
  return (
    <Input
      className={styles.example__controls__select}
      id={id}
      value={control.value.toString()}
      type="number"
      min={control.min}
      max={control.max}
      step={control.step}
      onChange={(e) => onChange(parseInt(e, 10))}
    />
  );
}
