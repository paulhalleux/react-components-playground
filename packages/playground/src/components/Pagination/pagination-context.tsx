import { createContext, PropsWithChildren, useContext, useMemo } from "react";

import { PaginationProps } from "./Pagination";

type PaginationContextType = {
  perPage: PaginationProps["perPage"];
  currentPage: PaginationProps["currentPage"];
  total: PaginationProps["total"];
  onPageChange: PaginationProps["onPageChange"];
  pageAmount: number;
};

const defaultValue: PaginationContextType = {
  perPage: 10,
  currentPage: 1,
  total: 0,
  onPageChange: () => {},
  pageAmount: 0,
};

const PaginationContext = createContext<PaginationContextType>(defaultValue);

export function PaginationProvider({
  children,
  ...value
}: PropsWithChildren<Omit<PaginationContextType, "pageAmount">>) {
  const pageAmount = useMemo(
    () => Math.ceil(value.total / value.perPage),
    [value.total, value.perPage],
  );

  return (
    <PaginationContext.Provider
      value={{
        ...value,
        pageAmount,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export function usePaginationContext() {
  return useContext(PaginationContext);
}
