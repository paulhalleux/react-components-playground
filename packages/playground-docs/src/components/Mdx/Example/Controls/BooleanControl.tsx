import { Checkbox } from "@paulhalleux/react-playground";

import { BooleanControl as BooleanControlType } from "../index";

import styles from "./SelectControl.module.scss";

type BooleanControlProps = {
  id: string;
  control: BooleanControlType;
  onChange: (value: boolean) => void;
};

export function BooleanControl({ id, control, onChange }: BooleanControlProps) {
  return (
    <div className={styles.checkbox__wrapper}>
      <Checkbox
        id={`${control.property}-${id}`}
        name={control.property}
        checked={control.value}
        onChange={onChange}
        label={control.label}
      />
    </div>
  );
}
