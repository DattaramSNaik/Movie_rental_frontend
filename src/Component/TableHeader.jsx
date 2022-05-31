import React from "react";

const TableHeader = ({ columns, onSort, sort_by }) => {
  const raiseSort = (column) => {
    let newSortColumn = { ...sort_by };

    if (sort_by.field === column.path) {
      if (sort_by.order_by === 1) {
        newSortColumn.order_by = -1;
      } else {
        newSortColumn.order_by = 1;
      }
    } else {
      newSortColumn.field = column.path;
      newSortColumn.order_by = 1;
    }
    onSort(newSortColumn);
  };
  let displayIcon = (column) => {
    if (sort_by.field !== column.path) return null;
    return sort_by.order_by === 1 ? (
      <ion-icon name="arrow-round-up"></ion-icon>
    ) : (
      <ion-icon name="arrow-round-down"></ion-icon>
    );
  };
  return (
    <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-white">
      <tr>
        {columns.map((c) => (
          <th
            key={c.path || c.key}
            scope="col"
            className="px-6 py-3 cursor-pointer"
            onClick={() => raiseSort(c)}
          >
            {c.header} {displayIcon(c)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
