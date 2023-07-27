import React, { useEffect } from "react";

import { useSelectorContext } from "./SelectorContext";
import { Selectable } from "./types";

export function selectable<T extends Selectable>(
  component: React.ComponentType<T>,
): React.FC<T> {
  return function (props: any) {
    const { register } = useSelectorContext();

    useEffect(() => {
      return register(props);
    }, [props]);

    return React.createElement(component, props);
  } as React.FC<T>;
}
