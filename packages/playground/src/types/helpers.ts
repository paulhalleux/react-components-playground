export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
    ? RecursivePartial<T[P]>
    : T[P];
};

export type Full<T> = {
  [P in keyof T]-?: T[P];
};

export type RecursiveFull<T> = {
  [P in keyof T]-?: T[P] extends (infer U)[]
    ? RecursiveFull<U>[]
    : T[P] extends object | undefined
    ? RecursiveFull<T[P]>
    : T[P];
};
