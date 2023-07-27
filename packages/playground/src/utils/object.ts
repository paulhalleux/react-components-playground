/**
 * Deep merge two objects.
 * @param base Base object.
 * @param object Object to merge into base.
 */
export function merge<T>(base: T, object: Partial<T>) {
  const result = { ...base };
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        result[key as keyof T] = value as T[keyof T];
      } else
        result[key as keyof T] = merge(
          base[key as keyof T],
          value as T[keyof T],
        );
    } else {
      result[key as keyof T] = value as T[keyof T];
    }
  });
  return result;
}
