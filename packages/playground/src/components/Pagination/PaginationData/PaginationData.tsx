import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../../types";
import { Divider } from "../../Divider";
import { EditInline } from "../../EditInline";
import { usePaginationContext } from "../pagination-context";

import styles from "./PaginationData.module.scss";

export type PaginationDataProps = PropsWithChildren<{
  /**
   * Whether to show the total number of items.
   */
  showTotal?: boolean;
}> &
  BaseProps;

export function PaginationData({
  showTotal,
  children,
  className,
  ...rest
}: PaginationDataProps) {
  const { total, perPage, currentPage, onPageChange } = usePaginationContext();

  const onChange = (value: string) => {
    const newPage = parseInt(value, 10);
    if (isNaN(newPage)) return;

    const boundedPage = Math.min(
      Math.max(newPage, 1),
      Math.ceil(total / perPage),
    );

    if (boundedPage !== currentPage) {
      onPageChange?.(boundedPage);
    }
  };

  return (
    <div className={clsx(styles.pagination__data, className)} {...rest}>
      <span className={styles.pagination__data__current}>
        <span>Page </span>
        {onPageChange ? (
          <EditInline
            inputClassName={styles.pagination__data__edit}
            trigger="click"
            value={currentPage.toString(10)}
            onChange={onChange}
          />
        ) : (
          <span>{currentPage}</span>
        )}
        <span>of {Math.ceil(total / perPage)}</span>
      </span>
      {showTotal && (
        <>
          <Divider orientation="horizontal" style={{ width: 12 }} />
          <span className={styles.pagination__data__item}>{total} items</span>
        </>
      )}
      {children && (
        <>
          <Divider orientation="horizontal" style={{ width: 12 }} />
          <span className={styles.pagination__data__item}>{children}</span>
        </>
      )}
    </div>
  );
}
