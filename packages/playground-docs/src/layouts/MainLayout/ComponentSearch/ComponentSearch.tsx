import { KeyboardShortcut, Search } from "../../../components";
import { Component } from "../../../types/component";
import { AutocompleteItem } from "../AutocompleteItem";

type ComponentSearchProps = {
  components: Component[];
};

export function ComponentSearch({ components }: ComponentSearchProps) {
  return (
    <Search
      placeholder="Search component..."
      addon={(input) => (
        <KeyboardShortcut
          shortcut="ctrl+k"
          onShortcut={() => input.current?.focus()}
        />
      )}
      autocompleteItems={components.map((component) => ({
        ...component,
        id: component.name,
      }))}
      renderAutocompleteItem={(component, className) => (
        <AutocompleteItem component={component} className={className} />
      )}
    />
  );
}
