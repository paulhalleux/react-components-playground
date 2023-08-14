import { useState } from "react";

const getStoredValue = (key: string, defaultValue: any) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    return JSON.parse(storedValue);
  }
  return defaultValue;
};

export function useStoreState<T>(
  key: string,
  defaultValue: T,
): [T, (newValue: T | ((oldValue: T) => T)) => void] {
  const [value, setValue] = useState<T>(getStoredValue(key, defaultValue) as T);

  const setStoreValue = (newValue: T | ((oldValue: T) => T)) => {
    const valueToStore =
      newValue instanceof Function ? newValue(value) : newValue;
    setValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [value, setStoreValue];
}
