import { Checkbox } from "@paulhalleux/react-playground";

import { BooleanControl as BooleanControlType } from "../index";

import styles from "./SelectControl.module.scss";

type BooleanControlProps = {
  control: BooleanControlType;
  onChange: (value: boolean) => void;
};

export function BooleanControl({ control, onChange }: BooleanControlProps) {
  return (
    <div className={styles.checkbox__wrapper}>
      <Checkbox
        variant="ghost"
        id={control.property}
        name={control.property}
        checked={control.value}
        onChange={onChange}
        label={control.label}
      />
    </div>
  );
}
