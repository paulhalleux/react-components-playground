import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import { PaginationProvider } from "./pagination-context";
import { PaginationData } from "./PaginationData";
import { PaginationNavigation } from "./PaginationNavigation";

import styles from "./Pagination.module.scss";

export type PaginationProps = PropsWithChildren<{
  perPage: number;
  currentPage: number;
  total: number;
  onPageChange?: (page: number) => void;
}> &
  BaseProps;

export function Pagination({
  children,
  total,
  currentPage,
  perPage,
  onPageChange,
  className,
  ...rest
}: PaginationProps) {
  return (
    <PaginationProvider
      perPage={perPage}
      currentPage={currentPage}
      total={total}
      onPageChange={onPageChange}
    >
      <div className={clsx(styles.pagination, className)} {...rest}>
        {children}
      </div>
    </PaginationProvider>
  );
}

Pagination.Data = PaginationData;
Pagination.Navigation = PaginationNavigation;
