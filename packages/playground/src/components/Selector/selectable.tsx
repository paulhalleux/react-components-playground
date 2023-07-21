import React, { useEffect } from "react";

import { Selectable } from "../../types";

import { useSelectorContext } from "./SelectorContext";

export function selectable<T extends Selectable>(
  component: React.ComponentType<T>,
): React.FC<T> {
  return function (props: any) {
    const { register } = useSelectorContext();

    useEffect(() => {
      return register(props);
    }, [props]);

    return React.createElement(component, props);
  };
}
