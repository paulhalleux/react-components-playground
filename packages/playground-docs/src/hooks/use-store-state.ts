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
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoreValue];
}
