/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelectorContext } from "./SelectorContext";
import { Selectable } from "../../types/selector";

export function selectable<T extends Selectable>(
  component: React.ComponentType<T>,
): React.FC<T> {
  return (props: any) => {
    const { register } = useSelectorContext();

    useEffect(() => {
      return register(props);
    }, [props]);

    return React.createElement(component, props);
  };
}
