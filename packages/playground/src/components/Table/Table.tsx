import React from "react";
import clsx from "clsx";

import { ArrowDownIcon, ArrowDownUpIcon, ArrowUpIcon } from "../Icons";

import styles from "./Table.module.scss";

export type TableColumn<T extends Record<string, any>> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T]) => React.ReactNode;
  renderHeader?: (label: string) => React.ReactNode;
  sortable?: boolean;
  sortFn?: (a: T, b: T, order: "asc" | "desc" | null) => number;
  sort?: "asc" | "desc" | null;
  width?: string | number;
};

export type TableProps<T extends Record<string, any>> = {
  columns: TableColumn<T>[];
  data: T[];
  maxHeight?: string | number;
};

export function Table<T extends Record<string, any>>({
  columns,
  data,
  maxHeight,
}: TableProps<T>) {
  const [tableColumns, setTableColumns] = React.useState(columns);
  const [tableData, setTableData] = React.useState(data);

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const onSort = (column: TableColumn<T>) => {
    if (!column.sortable || !column.sortFn) return;
    const newSort =
      column.sort === "asc" ? "desc" : column.sort === "desc" ? null : "asc";

    const newColumns = tableColumns.map(
      (c) =>
        (c.key === column.key ? { ...c, sort: newSort } : c) as TableColumn<T>,
    );

    const newTableData = [...tableData].sort((a, b) => {
      return column.sortFn!(a, b, newSort);
    });

    console.log(newTableData);

    setTableColumns(newColumns);
    setTableData(newTableData);
  };

  return (
    <div className={styles.table__container} style={{ maxHeight }}>
      <table className={styles.table}>
        <thead>
          <tr>
            {tableColumns.map((column) => (
              <th key={column.key as string} style={{ width: column.width }}>
                <div
                  className={clsx(styles.table__header, {
                    [styles.sorted]: !!column.sort,
                  })}
                >
                  {column.renderHeader
                    ? column.renderHeader(column.label)
                    : column.label}
                  {column.sortable && (
                    <button
                      className={styles.table__header__button}
                      onClick={() => onSort(column)}
                    >
                      {column.sort === "asc" ? (
                        <ArrowUpIcon height={14} width={14} />
                      ) : column.sort === "desc" ? (
                        <ArrowDownIcon height={14} width={14} />
                      ) : (
                        <ArrowDownUpIcon height={14} width={14} />
                      )}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key as string}>
                  {column.render
                    ? column.render(row[column.key])
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
