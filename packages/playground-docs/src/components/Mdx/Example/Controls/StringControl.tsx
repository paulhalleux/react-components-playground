import { Input } from "@paulhalleux/react-playground";

import { StringControl as StringControlType } from "../index";

type SelectControlProps = {
  id: string;
  control: StringControlType;
  onChange: (value: string) => void;
};

export function StringControl({ id, control, onChange }: SelectControlProps) {
  return (
    <Input
      id={id}
      value={control.value}
      onChange={onChange}
      style={{ width: "100%" }}
    />
  );
}
