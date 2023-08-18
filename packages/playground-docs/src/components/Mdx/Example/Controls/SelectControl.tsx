import { Select } from "@paulhalleux/react-playground";

import { SelectControl as SelectControlType } from "../index";

import styles from "./SelectControl.module.scss";

type SelectControlProps = {
  id: string;
  control: SelectControlType;
  onChange: (value: string) => void;
};

export function SelectControl({ id, control, onChange }: SelectControlProps) {
  return (
    <Select
      className={styles.example__controls__select}
      id={id}
      value={control.value}
      onChange={onChange}
      options={control.options.map((option) => ({
        label: option,
        value: option,
      }))}
    />
  );
}
