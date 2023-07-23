import { BooleanControl as BooleanControlType } from "../index";

type BooleanControlProps = {
  control: BooleanControlType;
  onChange: (value: boolean) => void;
};

export function BooleanControl({ control, onChange }: BooleanControlProps) {
  return (
    <input
      id={control.property}
      type={"checkbox"}
      checked={control.value}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
}
