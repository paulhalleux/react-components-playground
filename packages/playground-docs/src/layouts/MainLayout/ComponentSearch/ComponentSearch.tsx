import { KeyboardShortcut, Search } from "@paulhalleux/react-playground";

import { ComponentMeta } from "../../../../docs/__generated__/components";
import { AutocompleteItem } from "../AutocompleteItem";

type ComponentSearchProps = {
  components: ComponentMeta[];
};

export function ComponentSearch({ components }: ComponentSearchProps) {
  return (
    <Search
      placeholder="Search component..."
      addon={(input) => (
        <KeyboardShortcut
          shortcut={{ key: "k", ctrlKey: true }}
          onShortcut={() => input.current?.focus()}
        />
      )}
      items={components.map((component) => ({
        ...component,
        label: component.title,
        value: component.title,
      }))}
      renderItem={(item, className) => (
        <AutocompleteItem component={item} className={className} />
      )}
    />
  );
}
