import { KeyboardShortcut } from "@paulhalleux/react-playground";

import { ComponentMeta } from "../../../../docs/__generated__/components";
import { Search } from "../../../components";
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
      autocompleteItems={components.map((component) => ({
        ...component,
        name: component.title,
        id: component.title,
      }))}
      renderAutocompleteItem={(component, className) => (
        <AutocompleteItem component={component} className={className} />
      )}
    />
  );
}
