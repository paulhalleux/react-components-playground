import clsx from "clsx";

import { BaseProps } from "../../../types";
import { Button } from "../../Button";
import { ChevronLeftIcon, ChevronRightIcon } from "../../Icons";
import { usePaginationContext } from "../pagination-context";

import styles from "./PaginationNavigation.module.scss";

export type PaginationNavigationProps = BaseProps;

export function PaginationNavigation({
  className,
  ...rest
}: PaginationNavigationProps) {
  const { currentPage, onPageChange, pageAmount } = usePaginationContext();

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const onNext = () => {
    if (currentPage < pageAmount) {
      onPageChange?.(currentPage + 1);
    }
  };

  return (
    <div className={clsx(styles.pagination__navigation, className)} {...rest}>
      <Button.Icon size="small" icon={ChevronLeftIcon} onClick={onPrevious} />
      <Button.Icon size="small" icon={ChevronRightIcon} onClick={onNext} />
    </div>
  );
}
